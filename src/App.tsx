import {
	createHashRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout.tsx";
import Login from "./pages/auth/login/Login.tsx";

import RegisterProvider from "@/contexts/RegisterContext.tsx";
import ForgotPassword, { ResetPassword } from "@/pages/auth/ForgotPassword";
import Register, {
	AccountDetails,
	CreateNewPassword,
	OtpVerifyPage,
} from "@/pages/auth/register";
import HostelAllotment from "@/pages/private/HostelAllotment.tsx";
import MainLayout from "@/pages/private/MainLayout.tsx";
import authService from "@/services/AuthService.ts";
import { login, logout } from "@/store/authSlice.ts";
import { AuthUser } from "@/utils/models.ts";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BusySpinner from "./components/shared/BusySpinner.tsx";
import HostelDetails from "./pages/private/allotment/HostelDetails.tsx";
import ProfilePage from "./pages/private/ProfilePage.tsx";
import FeeDetails from "./pages/private/allotment/FeeDetails.tsx";
import ElectricityFee from "./pages/private/allotment/payments/ElectricityFee.tsx";
import HostelFee from "./pages/private/allotment/payments/HostelFee.tsx";

const router = createHashRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<MainLayout />}>
				<Route path={""} element={<ProfilePage />} />
				<Route path={"allotment"} element={<HostelAllotment />} />
				<Route path={"allotment/details"} element={<HostelDetails />} />
				<Route path={"fee-payment"} element={<FeeDetails />} />
				<Route path={"fee-payment/electricity"} element={<ElectricityFee />} />
				<Route path={"fee-payment/hostel"} element={<HostelFee />} />
				<Route path={"notifications"} element={<ProfilePage />} />
				<Route path={"complain"} element={<ProfilePage />} />
				<Route path={"help"} element={<ProfilePage />} />
			</Route>
			<Route element={<AuthLayout />}>
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/register" element={<RegisterProvider />}>
					<Route path={""} element={<Register />} />
					<Route path={"details"} element={<AccountDetails />} />
					<Route path={"verify"} element={<OtpVerifyPage />} />
					<Route path={"create-password"} element={<CreateNewPassword />} />
				</Route>
			</Route>
		</>
	)
);

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((user) => {
				if (user) {
					const userData: AuthUser = {
						name: user.name,
						email: user.email,
						reg_no: user.prefs?.reg_no,
					};
					dispatch(login(userData));
				} else {
					dispatch(logout());
				}
			})
			.catch((err) => {
				console.error("Error loading user in APP::", err);
			})
			.finally(() => setLoading(false));
	}, [dispatch]);

	if (loading)
		return (
			<>
				<BusySpinner />
			</>
		);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
