import axios, {AxiosInstance} from "axios";
import {BaseResponse} from "@/utils/models.ts";
import conf from "@/conf/conf.ts";

// Constants for HTTP status codes
const HTTP_STATUS = {
    INTERNAL_SERVER_ERROR: "5",
    CLIENT_ERROR: "4",
};

const handleError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        let message = "Something went wrong";
        let status = 500;

        const {response} = err;
        if (response) {
            status = response.status;
            const {data} = response;

            if (data) {
                console.log("Error Response:: ", data)
                message = data.message || data.errorMessage || (status.toString().startsWith(HTTP_STATUS.CLIENT_ERROR) ? "There is some error in your request." : "Internal server error, please contact the admin.");
            }
        }

        return {success: false, message, status} as BaseResponse<unknown>;
    }

    throw err;
};

const createAxiosInstance = (baseURL: string): AxiosInstance => {
    const instance = axios.create({baseURL});

    instance.interceptors.response.use(
        (res) => {
            const data = res.data;
            console.log("Success Response:: ", data);
            if (data.success) {
                return {...data, status: res.status, headers: res.headers};
            }
            return {
                success: true,
                message: "fetched",
                data: data,
                status: res.status,
                headers: res.headers
            }
        },
        (err) => handleError(err)
    );

    return instance;
};


export const serverAxios = createAxiosInstance(conf.serverBaseUrl);

