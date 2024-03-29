import { Card } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form.tsx";
import { z } from "zod";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import authService from "@/services/AuthService.ts";
import useRegister from "@/hooks/useRegister.ts";
import { useState } from "react";
import Spinner from "@/components/shared/Spinner";
import Container4 from "@/components/shared/Container4";

const PasswordValidation = z
	.object({
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" }),
		confirmPassword: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" }),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: "custom",
				message: "The passwords did not match",
			});
		}
		return true;
	});

export default function CreateNewPassword() {
	const navigate = useNavigate();
	const { registerData } = useRegister();
	const userId = registerData.userId;
	const email = registerData.student?.email;
	const [loading, setLoading] = useState(false);
	const formState = useForm<z.infer<typeof PasswordValidation>>({
		resolver: zodResolver(PasswordValidation),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	if (!email || !userId) {
		toast.error("Something went wrong, please try again.");
		return <Navigate to={"/register"} state={null} replace={true} />;
	}

	const onSubmit = (values: z.infer<typeof PasswordValidation>) => {
		console.log(values);
		if (!userId) return toast.error("User not found");
		setLoading(true);
		authService
			.createPassword({ email, password: values.password })
			.then((res) => {
				console.log(res);
				navigate("/login", { replace: true });
				toast.success(
					"Password created successfully, you can login with your reg no and password now."
				);
			})
			.catch((error) => {
				toast.error(error.message);
			})
			.finally(() => setLoading(false));
	};
	return (
		<Container4 className="flex flex-col justify-center items-center gap-xl custom-scrollbar">
			<Card className={"px-xl pt-4xl pb-5xl w-full"}>
				<Form {...formState}>
					<form
						onSubmit={formState.handleSubmit(onSubmit)}
						className={"flex flex-col gap-3xl"}
					>
						<h1>Create password</h1>
						{/*Registration Number field*/}
						<div className="fields flex flex-col gap-l">
							<FormField
								control={formState.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input {...field} type={"password"} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={formState.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input {...field} type={"password"} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type={"submit"} disabled={loading}>
							{loading ? <Spinner /> : "Create password"}
						</Button>
					</form>
				</Form>
			</Card>
		</Container4>
	);
}
