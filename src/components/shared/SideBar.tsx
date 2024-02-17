import authService from "@/services/AuthService";
import { AuthState, logout } from "@/store/authSlice";
import { navButtons } from "@/utils/Constants.ts";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

export default function SideBar() {
	const authState = useSelector((state) => state.auth as AuthState);
	const dispatch = useDispatch();

	return (
		<section
			className={
				" md:w-[271px] hidden h-full overflow-hidden md:flex flex-col pb-xl bg-primary text-primary-foreground gap-xl"
			}
		>
			<div className="top w-full flex items-center p-ml gap-s border-b border-gray">
				<img src={"/img/logo.png"} width={32} height={30} alt={"BIT Logo"} />
				<h5>Student Dashboard</h5>
			</div>
			<div className="bottom w-full flex-1 flex flex-col justify-between px-sm gap-m overflow-y-auto custom-scrollbar">
				<div className="buttons flex flex-col gap-m">
					{navButtons.map((button) => {
						return (
							<NavLink
								to={button.href}
								key={button.href}
								replace={true}
								className={({ isActive }) => {
									return `w-full rounded-sm py-s px-sm flex items-center gap-sm ${
										isActive && "bg-[#36407F] font-semibold"
									}`;
								}}
							>
								<img
									src={button.icon}
									alt={button.name}
									width={20}
									height={20}
								/>
								<p>{button.name}</p>
							</NavLink>
						);
					})}
				</div>
				<NavLink
					to={"/help"}
					replace={true}
					className={({ isActive }) => {
						return `w-full rounded-sm py-s px-sm flex items-center gap-sm ${
							isActive && "bg-[#36407F] font-semibold"
						}`;
					}}
				>
					<img
						src={"/img/help-circle.svg"}
						alt={"Help & Support"}
						width={20}
						height={20}
					/>
					<p>Help & Support</p>
				</NavLink>
			</div>
			<div className="flex w-full justify-between py-s px-l items-center border-t border-b border-gray gap-s">
				<div className="avtar-p cursor-pointer w-xl h-xl p-2 rounded-full bg-gray flex justify-center items-center">
					<img
						src={"/img/profile.svg"}
						alt="profile"
						className="w-full h-full"
					/>
				</div>
				<div className="flex flex-col">
					<p>{authState.user?.reg_no}</p>
					<span>{authState.user?.name}</span>
				</div>
				<img
					src={"/img/logout.svg"}
					alt={"Logout"}
					className={"cursor-pointer"}
					onClick={() => {
						toast.promise(authService.logout(), {
							loading: "Logging out...",
							success: (res) => {
								console.log(res);
								dispatch(logout());
								return "Logged out successfully";
							},
							error: "Failed to logout",
						});
					}}
					width={"20"}
					height={"20"}
				/>
			</div>
		</section>
	);
}
