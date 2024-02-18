import { Navigate, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import authService from "@/services/AuthService.ts";
import { toast } from "sonner";
import useRegister from "@/hooks/useRegister.ts";
import { useState } from "react";
import Spinner from "@/components/shared/Spinner";
import Container8 from "@/components/shared/Container8";

export default function AccountDetails() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { registerData, updateData } = useRegister();
	const student = registerData.student;

	if (!student) {
		toast.error("Something went wrong, please try again");
		return <Navigate to={"/register"} replace={true} state={null} />;
	}

	const sendOtp = () => {
		// send otp to the mobile number
		if (!student) return;
		console.log(student?.phone_no);
		setLoading(true);
		authService
			.sendOtp(student?.phone_no)
			.then((res) => {
				console.log(res);
				if (!res) return toast.error("Failed to send OTP");
				const data = { ...registerData, userId: res };
				updateData(data);
				navigate("/register/verify", {
					state: data,
					replace: true,
				});
			})
			.catch((err) => {
				console.error(err);
				toast.error("Failed to send OTP");
			})
			.finally(() => setLoading(false));
	};
	return (
		<Container8
			className={
				"w-full h-full overflow-y-auto flex flex-col justify-center items-center"
			}
		>
			<Card className={"px-3xl pt-4xl pb-5xl w-full space-y-5xl"}>
				<div className="details flex flex-col gap-4xl">
					<h1>Account Details</h1>
					<div className="grid md:grid-cols-2 gap-x-4xl gap-y-xl">
						<div className="flex flex-col w-full gap-s">
							<Label htmlFor={"name"}>Registration number</Label>
							<Input
								defaultValue={student?.reg_no}
								readOnly={true}
								className={"cursor-default"}
							/>
						</div>
						<div className="flex flex-col w-full gap-s">
							<Label htmlFor={"name"}>Batch</Label>
							<Input
								defaultValue={student?.batch || ""}
								readOnly={true}
								className={"cursor-default"}
							/>
						</div>
						<div className="flex flex-col w-full gap-s">
							<Label htmlFor={"name"}>Name</Label>
							<Input
								defaultValue={student?.name}
								readOnly={true}
								className={"cursor-default"}
							/>
						</div>
						<div className="flex flex-col w-full gap-s">
							<Label htmlFor={"name"}>Branch</Label>
							<Input
								defaultValue={student?.branch?.name || ""}
								readOnly={true}
								className={"cursor-default"}
							/>
						</div>
						<div className="flex flex-col w-full gap-s">
							<Label htmlFor={"name"}>Mobile number</Label>
							<Input
								defaultValue={student?.phone_no}
								readOnly={true}
								className={"cursor-default"}
							/>
						</div>
						<div className="flex flex-col w-full gap-s">
							<Label htmlFor={"name"}>Email Id</Label>
							<Input
								defaultValue={student?.email}
								readOnly={true}
								className={"cursor-default"}
							/>
						</div>
					</div>
				</div>
				<div className="mx-auto w-fit md:max-w-[387px] flex flex-col items-center justify-center gap-ml">
					<Button
						type={"submit"}
						size={"full"}
						onClick={sendOtp}
						disabled={loading}
					>
						{loading ? <Spinner /> : "Continue"}
					</Button>
					<span className={"text-gray"}>
						OTP will be sent for verification on your mobile number
					</span>
				</div>
			</Card>
		</Container8>
	);
}
