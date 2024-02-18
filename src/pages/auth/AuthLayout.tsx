import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
	const authState = useSelector((state: RootState) => state.auth);
	if (authState.loggedIn) {
		return <Navigate to={"/"} replace={true} />;
	}
	return (
		<section
			className={
				"h-screen w-full mx-auto max-w-[1440px] gap-l  sm:px-[27px] grid sm:grid-cols-12"
			}
		>
			<Outlet />
		</section>
	);
}
