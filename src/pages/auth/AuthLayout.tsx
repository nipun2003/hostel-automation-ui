import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {AuthState} from "@/store/authSlice.ts";

export default function AuthLayout() {

    const authState = useSelector(state => state.auth as AuthState);
    if (authState.loggedIn) {
        return <Navigate to={"/"} replace={true}/>
    }
    return (
        <section className={'h-screen w-full mx-auto max-w-[1440px]  md:px-[60px] flex justify-center items-center'}>
            <Outlet/>
        </section>
    )
}