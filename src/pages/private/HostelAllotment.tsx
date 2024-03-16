import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import conf from "@/conf/conf.ts";
import useAuth from "@/hooks/useAuth";
import batches from "@/utils/data/batches.json";
import { Gender } from "@/utils/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const LoginValidation = z.object({
	registration: z
		.string()
		.min(11, { message: "Registration number should be 11 character long." })
		.max(255),
	batch: z
		.number()
		.int()
		.min(1, { message: "Please select a valid batch." })
		.max(4, { message: "Please select a valid batch." }),
	gender: z.nativeEnum(Gender, {
		errorMap: (issue) => {
			switch (issue.code) {
				case "invalid_type":
					return { message: "Please select valid gender" };
				case "invalid_enum_value":
					return { message: "Please select valid gender" };
				default:
					return { message: "Please, select your gender" };
			}
		},
	}),
});
export default function HostelAllotment() {
	const [loading, setLoading] = useState(false);
	const { user } = useAuth();
	const navigate = useNavigate();
	const formState = useForm<z.infer<typeof LoginValidation>>({
		resolver: zodResolver(LoginValidation),
		defaultValues: {
			registration: user?.reg_no,
			batch: undefined,
			gender: undefined,
		},
	});
	const onSubmit = (values: z.infer<typeof LoginValidation>) => {
		console.log(values);
		navigate("details", {
			state: values,
		});
		setLoading(true);
		setLoading(false);
	};
	return (
		<>
			<Helmet>
				<title>{conf.siteTitle} - Hostel Allotment</title>
			</Helmet>
			<Card className="px-xl pt-4xl pb-5xl w-full md:w-[414px]">
				<Form {...formState}>
					<form
						onSubmit={formState.handleSubmit(onSubmit)}
						className={"flex flex-col gap-3xl"}
					>
						{/*Registration Number field*/}
						<div className="flex flex-col gap-l">
							<FormField
								control={formState.control}
								name="registration"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Registration number</FormLabel>
										<FormControl>
											<Input {...field} readOnly={true} maxLength={11} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={formState.control}
								name="batch"
								render={({ field }) => (
									<Select
										defaultValue={field.value?.toString()}
										onValueChange={(e) => {
											field.onChange(parseInt(e));
										}}
									>
										<FormItem>
											<Label>Year of studying</Label>
											<SelectTrigger>
												<SelectValue placeholder="Year of studying" />
											</SelectTrigger>
											<SelectContent>
												{batches.map((batch) => (
													<SelectItem
														key={batch.id}
														value={batch.id.toString()}
													>
														{batch.name}
													</SelectItem>
												))}
											</SelectContent>
											<FormMessage />
										</FormItem>
									</Select>
								)}
							/>
							<FormField
								control={formState.control}
								name="gender"
								render={({ field }) => (
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
									>
										<FormItem>
											<Label>Gender</Label>
											<SelectTrigger>
												<SelectValue placeholder="Select your gender" />
											</SelectTrigger>
											<SelectContent>
												{Object.keys(Gender).map((gender) => (
													<SelectItem key={gender} value={gender}>
														{gender}
													</SelectItem>
												))}
											</SelectContent>
											<FormMessage />
										</FormItem>
									</Select>
								)}
							/>
						</div>
						<Button type={"submit"} disabled={loading}>
							{loading ? <Spinner /> : "Continue"}
						</Button>
					</form>
				</Form>
			</Card>
		</>
	);
}
