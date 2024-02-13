import {Outlet} from "react-router-dom";

export default function AuthLayout() {
    return (
        <section className={'h-screen w-full mx-auto max-w-[1440px]  md:px-[60px] flex justify-center items-center'}>
            <Outlet/>
        </section>
    )
}