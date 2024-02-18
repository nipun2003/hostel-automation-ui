import Container4 from "@/components/shared/Container4";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import conf from "@/conf/conf";
import authService from "@/services/AuthService.ts";
import { login } from "@/store/authSlice.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const LoginValidation = z.object({
	registration: z
		.string()
		.min(11, { message: "Registration number should be 11 character long." })
		.max(255),
	password: z.string(),
});

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const formState = useForm<z.infer<typeof LoginValidation>>({
		resolver: zodResolver(LoginValidation),
		defaultValues: {
			registration: "",
			password: "",
		},
	});

	// axios.defaults.headers.Authorization = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyZWZyZXNoX3Rva2VuX2NpbSI6MTQ0MCwic3ViIjoibmlwdW4ub2ZmaWNpYWwuMjAwNkBnbWFpbC5jb20iLCJmbmFtZSI6Ik5pcHVuIiwibW9iIjoiODg3Mzg1ODQ1NSIsImp3dF90b2tlbl9jaW0iOjM1NDAwMDAsIlJvbGVzIjpbIm5vcm1hbF91c2VyIl0sIk9yZ2FuaXphdGlvbklkIjoiMSIsInByZWZlcnJlZF91c2VybmFtZSI6Im5pcHVuLm9mZmljaWFsLjIwMDZAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfbm9ybWFsX3VzZXIifV0sInJlZnJlc2hfdG9rZW5fZXhwIjoxNzA3OTMzMDA2NTM2LCJyZWZyZXNoX3Rva2VuX2lhdCI6MTcwNzkzMTUwNjU0MiwibG5hbWUiOiJLdW1hciIsImV4cCI6MTcwNzkzNTEwNiwiaWF0IjoxNzA3OTMxNTA2fQ.8n4p5j7si_RoJrPSqjY4r35Ihy8qro7Lm0eH8FOJlOait3MNV5P7y7Zy2bjoGihAbKB-E2r8g6DalxFREt5BcQ";
	//
	// axios.get("https://app-safe.mayadataprivacy.eu/api/file-safe/file/groups", ).then(res => console.log(res.data)).catch(err => console.log(err));

	const onSubmit = (values: z.infer<typeof LoginValidation>) => {
		if (loading) return;
		console.log(values);
		setLoading(true);
		authService
			.loginWithRegAndPassword({
				registrationNumber: values.registration,
				password: values.password,
			})
			.then((res) => {
				dispatch(login(res));
				navigate("/", { replace: true });
				toast.success("Logged in successfully");
			})
			.catch((error) => {
				console.log(error);
				if (error.message) {
					const message = error.message.toString();
					toast.error(message.replace("email", "registration number"));
				} else {
					toast.error(error.message);
				}
			})
			.finally(() => setLoading(false));
	};

	return (
		<>
			<Helmet>
				<title>{conf.siteTitle} - Login</title>
			</Helmet>
			<Container4 className=" flex flex-col justify-center items-center gap-l ">
				<img src={"/img/logo.png"} alt={"logo"} width={"72"} height={"85.53"} />
				<Card className={"px-xl pt-4xl pb-3xl w-full"}>
					<Form {...formState}>
						<form
							onSubmit={formState.handleSubmit(onSubmit)}
							className={"flex flex-col"}
						>
							<div className="fields space-y-l">
								{/*Registration Number field*/}
								<FormField
									control={formState.control}
									name="registration"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Registration number</FormLabel>
											<FormControl>
												<Input {...field} maxLength={11} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/*Password Field */}
								<FormField
									control={formState.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input type={"password"} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button
								type={"submit"}
								className={"mt-3xl mb-sm"}
								disabled={loading}
							>
								{loading ? <Spinner /> : "Log in"}
							</Button>
							<div className="mx-auto">
								<Link to={"/forgot-password"}>
									<Button variant={"link"}>Forgot password? </Button>
								</Link>
							</div>
						</form>
					</Form>
				</Card>
				<div className="flex items-center mt-xs gap-1">
					<strong className="text-gray">Don't have an account? </strong>
					<Link to={"/register"}>
						<Button variant={"link"}> Register</Button>
					</Link>
				</div>
			</Container4>
		</>
	);
}
