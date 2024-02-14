import {Account, Client, Databases, ID} from "appwrite";
import conf from "@/conf/conf.ts";
import {AuthUser, BaseResponse, Student} from "@/utils/models.ts";
import {serverAxios} from "@/utils/AxiosUtils.ts";

class AuthService {
    client = new Client();
    account;
    database;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl) // Your API Endpoint
            .setProject(conf.appWriteProjectId) // Your project ID
        this.account = new Account(this.client);
        this.database = new Databases(this.client);
    }

    private async getStudentWithReg(regNo: string) {
        if (regNo.length === 0) throw new Error("Registration number is empty");
        const res = await serverAxios.post("check_reg", {
            reg_no: regNo
        }) as BaseResponse<Student>;
        if (!res.success) {
            throw new Error(res.message);
        }
        return res.data as Student;
    }

    private async setRegNoToAccount(regNo: string) {
        await this.account.updatePrefs({
            reg_no: regNo
        });
    }

    // OTP Stuffs

    async sendOtp(phone: string) {
        if (!phone) {
            throw new Error("Phone number is required");
        }
        if (!phone.startsWith("+91")) {
            phone = "+91" + phone;
        }
        const sessionToken = await this.account.createPhoneSession(
            ID.unique(),
            phone
        );
        return sessionToken.userId;
    }

    async verifyOtp({userId, otp, name}: { userId: string, otp: string, name: string }) {
        const session = await this.account.updatePhoneSession(
            userId,
            otp
        );
        await this.account.updateName(name);
        return session.userId;
    }

    async loginWithRegAndPassword({registrationNumber, password}: { registrationNumber: string, password: string }) {
        const student = await this.getStudentWithReg(registrationNumber);
        console.log("student", student)
        await this.account.createEmailSession(
            student.email,
            password
        );
        const loggedInUser = await this.getCurrentUser();
        if (!loggedInUser) throw new Error("Failed to login");
        await this.setRegNoToAccount(student.reg_no);
        console.log("loggedInUser", loggedInUser);
        const authUser: AuthUser = {
            name: loggedInUser.name,
            email: loggedInUser.email,
            reg_no: student.reg_no,
        }
        return authUser;
    }


    // Create Password stuffs
    async checkRegForForgotPassword(regNo: string) {
        const student = await this.getStudentWithReg(regNo);
        await this.account.createRecovery(student.email, conf.siteUrl + "reset-password");
        return student;
    }

    async resetPassword({userId, secret, password}: { userId: string, secret: string, password: string }) {
        await this.account.updateRecovery(userId, secret, password, password);
    }


    async createPassword({password, email}: { password: string, email: string }) {
        await this.account.updatePassword(password);
        await this.account.updateEmail(email, password);
        await this.logout();
    }

    // Creating New User
    async checkRegistrationNumberForNewUser(registrationNumber: string) {
        try {
            const res = await serverAxios.post("check_reg", {
                reg_no: registrationNumber
            }) as BaseResponse<Student>;
            if (!res.status.toString().startsWith("2")) {
                throw new Error(res.message);
            }
            if (res.success) {
                throw new Error("Sorry, this registration number is already registered. Please login with your password.");
            }
            return res.data as Student;
        } catch (e: unknown) {
            if (e instanceof Error) {
                const message = e.message;
                if (message.includes("ID could not be found")) {
                    throw new Error("Sorry, we couldn't find any student with this registration number. Please check and try again.");
                }
                throw e;
            }
            throw new Error("Something went wrong. Please try again later.");
        }
    }


    // Account Stuffs

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (e: unknown) {
            console.log("Error getting account", e);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (e: unknown) {
            console.log("Error logging out", e);
        }
    }
}

const
    authService = new AuthService();
export default authService;