import {Account, Client, Databases, ID, Query} from "appwrite";
import conf from "@/conf/conf.ts";
import {Student} from "@/utils/models.ts";

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

    async loginWithRegAndPassword({registrationNumber, password}: { registrationNumber: string, password: string }) {
        const response = await this.database.listDocuments(
            conf.appWriteDatabaseId,
            conf.appWriteStudentCollectionId,
            [
                Query.equal("reg_no", registrationNumber),
            ]
        );
        console.log("User details", response);
        if (response.total === 0) {
            throw new Error("No student found with this registration number");
        }
        const student = response.documents[0] as Student;
        const session = await this.account.createEmailSession(
            student.email,
            password
        );
        return session.userId;
    }

    async verifyOtp({userId, otp, name}: { userId: string, otp: string, name: string, email: string }) {
        const session = await this.account.updatePhoneSession(
            userId,
            otp
        );
        await this.account.updateName(name);
        return session.userId;
    }

    async createPassword({password, email}: { password: string, email: string }) {
        await this.account.updatePassword(password);
        await this.account.updateEmail(email, password);
    }

    async getDetailFromRegistrationNumber(registrationNumber: string) {
        const response = await this.database.listDocuments(
            conf.appWriteDatabaseId,
            conf.appWriteStudentCollectionId,
            [
                Query.equal("reg_no", registrationNumber)
            ]
        );
        console.log("User details", response);
        if (response.total === 0) {
            throw new Error("No student found with this registration number");
        }
        return response.documents[0] as Student;
    }
}

const
    authService = new AuthService();
export default authService;