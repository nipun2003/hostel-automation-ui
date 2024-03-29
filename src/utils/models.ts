import {AxiosResponseHeaders, RawAxiosResponseHeaders} from "axios";

export interface BaseResponse<T> {
    success: boolean,
    message?: string,
    status: number,
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders
    data?: T
}

export type AuthUser = {
    name: string;
    email: string;
    reg_no: string;
}

export type Student = {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: unknown[];
    $updatedAt: string;
    address: string;
    batch: number | null;
    branch: Branch | null;
    city: string;
    dob: string;
    email: string;
    fathers_name: string;
    gender: string;
    mothers_name: string;
    name: string;
    phone_no: string;
    pin_code: number;
    reg_no: string;
    roll_no: string;
    state: string;
}
export type Branch = {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: unknown[];
    $updatedAt: string;
    name: string;
    short_name: string;
}
