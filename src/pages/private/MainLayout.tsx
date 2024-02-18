import SideBar from "@/components/shared/SideBar.tsx";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
	const authState = useSelector((state: RootState) => state.auth);
	const location = useLocation();
	if (!authState.loggedIn) {
		return <Navigate to={"/login"} state={{ from: location }} />;
	}
	return (
		<main className={"w-full h-screen overflow-x-hidden flex"}>
			<SideBar />
			<section className="bg-surface flex-1 h-screen overflow-hidden flex items-center justify-center">
				<Outlet />
			</section>
		</main>
	);
}
