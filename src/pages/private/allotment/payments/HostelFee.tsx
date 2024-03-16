import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import conf from "@/conf/conf";
import { StoragePref } from "@/utils/StoragePref";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function HostelFee() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const details = StoragePref.get();

	return (
		<>
			<Helmet>
				<title>{conf.siteTitle} - Hostel Fee</title>
			</Helmet>
			<Card className={"px-xl pt-4xl pb-5xl w-full md:w-[414px]"}>
				<div className={"flex flex-col gap-3xl"}>
					<h1>Hostel Fee</h1>
					{/*Registration Number field*/}
					<div>
						<Label>Hostel Fee</Label>
						<Input readOnly={true} defaultValue={"7000"} />
					</div>
					<Button
						type={"submit"}
						disabled={loading}
						onClick={() => {
							setLoading(true);
							StoragePref.set({ ...details, hostel_pay: true });
							setLoading(false);
							navigate("/fee-payment");
						}}
					>
						{loading ? <Spinner /> : "Proceed to pay"}
					</Button>
				</div>
			</Card>
		</>
	);
}
