import {Student} from "@/utils/models.ts";
import {createContext, useContext} from "react";


export type RegisterData = {
    userId: string | null,
    student: Student | null
}

type RegisterProp = {
    registerData: RegisterData,
    updateData: (data: RegisterData) => void,
}

const defaultValue: RegisterProp = {
    registerData: {
        userId: null,
        student: null
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateData: (_data) => {

    },
}

export const RegisterContext = createContext<RegisterProp>(defaultValue)

export default function useRegister() {
    return useContext(RegisterContext);
}
