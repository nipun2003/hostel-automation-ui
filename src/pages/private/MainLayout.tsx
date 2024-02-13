import SideBar from "@/components/shared/SideBar.tsx";
import {Outlet} from "react-router-dom";

export default function MainLayout() {

    return (
        <main className={'w-full h-screen overflow-x-hidden flex'}>
            <SideBar/>
            <Outlet />
        </main>
    )
}