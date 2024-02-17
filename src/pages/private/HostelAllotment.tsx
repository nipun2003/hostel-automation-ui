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
import conf from "@/conf/conf.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginValidation = z.object({
	registration: z
		.string()
		.min(11, { message: "Registration number should be 11 character long." })
		.max(255),
	password: z.string(),
});
export default function HostelAllotment() {
	const [loading, setLoading] = useState(false);
	const formState = useForm<z.infer<typeof LoginValidation>>({
		resolver: zodResolver(LoginValidation),
		defaultValues: {
			registration: "",
			password: "",
		},
	});
	const onSubmit = (values: z.infer<typeof LoginValidation>) => {};
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
						<Button type={"submit"} disabled={loading}>
							{loading ? <Spinner /> : "Continue"}
						</Button>
					</form>
				</Form>
			</Card>
		</>
	);
}
