import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout.tsx";
import Login from "./pages/auth/Login.tsx";
import {Toaster} from "sonner";
import AccountDetails from "@/pages/auth/AccountDetails.tsx";
import OtpVerifyPage from "@/pages/auth/OtpVerifyPage.tsx";
import CreateNewPassword from "@/pages/auth/CreateNewPassword.tsx";
import RegisterProvider from "@/contexts/RegisterContext.tsx";
import Register from "@/pages/auth/Register.tsx";
import MainLayout from "@/pages/private/MainLayout.tsx";
import HostelAllotment from "@/pages/private/HostelAllotment.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<MainLayout/>}>
                <Route path={"profile"} element={<HostelAllotment/>}/>
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
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
        <Toaster richColors={true} position={"bottom-center"}/>
    </React.StrictMode>
);
