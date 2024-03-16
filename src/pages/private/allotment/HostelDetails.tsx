import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import authService from "@/services/AuthService.ts";
import { StoragePref } from "@/utils/StoragePref";
import { Student } from "@/utils/models";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HostelDetails() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const regNo = location.state;
	const [student, setStudent] = useState<Student | null>(null);
	const details = StoragePref.get();

	const onContinueClick = () => {
		const hostelNumbers = [1, 2, 3, 4, 5, 6, 14, 17, 18, 19];
		const hostelNo =
			hostelNumbers[Math.floor(Math.random() * hostelNumbers.length)];
		const roomNo = Math.floor(Math.random() * 100) + 1;
		StoragePref.set({ ...details, hostel_no: hostelNo, room_no: roomNo });
		navigate("/fee-payment");
	};

	useEffect(() => {
		setLoading(true);
		authService
			.getStudentWithReg(regNo)
			.then((s) => setStudent(s))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, [regNo]);
	return (
		<section
			className={
				"w-full overflow-y-auto flex flex-col justify-center items-center px-m md:max-w-[850px]"
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
							<Label htmlFor={"name"}>Hostel for final year boys</Label>
							<Input
								defaultValue={"1,2,3,4,5,6,14,17,18,19"}
								readOnly={true}
								className="cursor-default"
							/>
						</div>
					</div>
				</div>
				<div className="mx-auto w-fit md:max-w-[387px] flex flex-col items-center justify-center gap-ml">
					<Button
						type={"submit"}
						size={"full"}
						onClick={onContinueClick}
						disabled={loading}
					>
						{loading ? <Spinner /> : "Continue"}
					</Button>
					<span className={"text-gray"}>
						On clicking continue you will get your Hostel and Room number
					</span>
				</div>
			</Card>
		</section>
	);
}
