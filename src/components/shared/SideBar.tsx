import {navButtons} from "@/utils/Constants.ts";
import {NavLink} from "react-router-dom";

export default function SideBar() {
    return <section
        className={' md:w-[271px] hidden h-full overflow-hidden md:flex flex-col pb-xl bg-primary text-primary-foreground gap-xl'}>
        <div className="top w-full flex items-center p-ml gap-s border-b border-gray">
            <img src={'/img/logo.png'} width={32} height={30} alt={'BIT Logo'} />
            <h5>Student Dashboard</h5>
        </div>
        <div className="bottom w-full flex-1 flex flex-col justify-between px-sm gap-m overflow-y-auto custom-scrollbar">
            <div className="buttons flex flex-col gap-m">
                {navButtons.map(button => {
                    return <NavLink to={button.href} key={button.href}
                                    replace={true}
                                    className={({isActive}) => {
                                        return `w-full rounded-sm py-s px-sm flex items-center gap-sm ${isActive && 'bg-[#36407F] font-semibold'}`
                                    }}
                    >
                        <img src={button.icon} alt={button.name} width={20} height={20}/>
                        <p>{button.name}</p>
                    </NavLink>
                })}
            </div>
            <NavLink to={"/help"}
                     replace={true}
                     className={({isActive}) => {
                         return `w-full rounded-sm py-s px-sm flex items-center gap-sm ${isActive && 'bg-[#36407F] font-semibold'}`
                     }}
            >
                <img src={"/img/help-circle.svg"} alt={"Help & Support"} width={20} height={20}/>
                <p>Help & Support</p>
            </NavLink>
        </div>
    </section>
}