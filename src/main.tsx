import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "@/pages/auth/Register.tsx";
import {Toaster} from "sonner";
import AccountDetails from "@/pages/auth/AccountDetails.tsx";
import OtpVerifyPage from "@/pages/auth/OtpVerifyPage.tsx";
import CreateNewPassword from "@/pages/auth/CreateNewPassword.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App/>}></Route>
            <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path={"/register/details"} element={<AccountDetails/>}/>
                <Route path={"/register/verify"} element={<OtpVerifyPage/>}/>
                <Route path={"/register/create-password"} element={<CreateNewPassword/>}/>
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
