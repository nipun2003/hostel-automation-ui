import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout.tsx";
import Login from "./pages/auth/login/Login.tsx";

import RegisterProvider from "@/contexts/RegisterContext.tsx";
import Register, {AccountDetails, CreateNewPassword, OtpVerifyPage} from "@/pages/auth/register";
import MainLayout from "@/pages/private/MainLayout.tsx";
import HostelAllotment from "@/pages/private/HostelAllotment.tsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import authService from "@/services/AuthService.ts";
import {AuthUser} from "@/utils/models.ts";
import {login, logout} from "@/store/authSlice.ts";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<MainLayout/>}>
                <Route path={""} element={<HostelAllotment/>}/>
                <Route path={"allotment"} element={<HostelAllotment/>}/>
                <Route path={"fee-payment"} element={<HostelAllotment/>}/>
                <Route path={"notifications"} element={<HostelAllotment/>}/>
                <Route path={"complain"} element={<HostelAllotment/>}/>
                <Route path={"help"} element={<HostelAllotment/>}/>
            </Route>
            <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<RegisterProvider/>}>
                    <Route path={""} element={<Register/>}/>
                    <Route path={"details"} element={<AccountDetails/>}/>
                    <Route path={"verify"} element={<OtpVerifyPage/>}/>
                    <Route path={"create-password"} element={<CreateNewPassword/>}/>
                </Route>
            </Route>
        </>
    )
);

function App() {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser()
            .then(user => {
                if (user) {
                    const userData: AuthUser = {
                        name: user.name,
                        email: user.email,
                        reg_no: user.prefs?.reg_no,
                    }
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            }).catch(err => {
            console.error("Error loading user in APP::", err);
        })
            .finally(() => setLoading(false));
    }, [dispatch]);

    if (loading) return <>
        <div className="flex items-center justify-center w-full h-screen">App is Loading...</div>
    </>;

    return <>
        <RouterProvider router={router}/>
    </>;
}

export default App;
