import {Outlet} from "react-router-dom";

export default function AuthLayout() {
    return (
        <section className={'h-screen w-full mx-auto max-w-[1440px] flex justify-center items-center'}>
            <Outlet/>
        </section>
    )
}