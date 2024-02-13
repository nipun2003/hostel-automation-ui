import SideBar from "@/components/shared/SideBar.tsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {AuthState} from "@/store/authSlice.ts";

export default function MainLayout() {
    const authState = useSelector(state => state.auth as AuthState);
    const location = useLocation();
    if (!authState.loggedIn) {
        return <Navigate to={"/login"} state={{from: location}}/>
    }
    return (
        <main className={'w-full h-screen overflow-x-hidden flex'}>
            <SideBar/>
            <Outlet/>
        </main>
    )
}