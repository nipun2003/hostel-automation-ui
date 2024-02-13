import {Outlet, useLocation} from "react-router-dom";
import {useState} from "react";
import {RegisterContext, RegisterData} from "@/hooks/useRegister.ts";

export default function RegisterProvider() {
    const {state} = useLocation();
    const [registerData, setRegisterData] = useState<RegisterData>(state
        || {
            userId: null,
            student: null
        });

    const updateData = (data: RegisterData) => {
        setRegisterData(data);
    }
    return <RegisterContext.Provider value={{registerData, updateData}}>
        <Outlet/>
    </RegisterContext.Provider>
}