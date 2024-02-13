import {Account, Client, Databases, ID} from "appwrite";
import conf from "@/conf/conf.ts";
import {BaseResponse, Student} from "@/utils/models.ts";
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
        const res = await serverAxios.get("students/" + registrationNumber) as BaseResponse<Student>;
        if (!res.success) {
            throw new Error(res.message);
        }
        const student = res.data as Student;
        console.log("student", student)
        const session = await this.account.createEmailSession(
            student.email,
            password
        );
        return session.userId;
    }


    async createPassword({password, email}: { password: string, email: string }) {
        await this.account.updatePassword(password);
        await this.account.updateEmail(email, password);
        await this.account.deleteSessions();
    }

    async getDetailFromRegistrationNumber(registrationNumber: string) {
        try {
            const res = await serverAxios.post("check_reg", {
                reg_no: registrationNumber
            }) as BaseResponse<Student>
            if (res.success) {
                return res.data as Student
            }
            throw new Error(res.message);
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
}

const
    authService = new AuthService();
export default authService;