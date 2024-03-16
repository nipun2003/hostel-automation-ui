import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import conf from "@/conf/conf.ts";
import { StoragePref } from "@/utils/StoragePref";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const FeeDetails = () => {
	const details = StoragePref.get();
	const navigate = useNavigate();
	const showHostelNotAlloted = () => {
		toast.info("Hostel not alloted yet");
	};
	return (
		<>
			<Helmet>
				<title>{conf.siteTitle} - Fee Details</title>
			</Helmet>
			<section className="flex flex-col gap-[112px]">
				{details.hostel_no && details.room_no && (
					<div className="px-m py-l rounded-lg bg-tertiary border border-secondary text-secondary flex items-center justify-center">
						Congratulations! Your Hostel number is {details.hostel_no} and Room
						number is {details.room_no}
					</div>
				)}
				<Card className="px-xl pt-4xl pb-5xl w-full md:w-[769px]">
					<div className={"flex flex-col gap-3xl"}>
						<h1>Pay Fee</h1>
						<div className="flex items-center gap-m">
							<Button
								variant={"outline"}
								size={"full"}
								className="md:w-[387px]"
								onClick={() => {
									if (details.hostel_pay) return;
									if (!details.hostel_no) {
										showHostelNotAlloted();
										return;
									}
									navigate("hostel");
								}}
							>
								Hostel Fee
							</Button>
							{details.hostel_pay && <img src="/img/check.svg" alt="checked" />}
						</div>
						<div className="flex items-center gap-m">
							<Button
								variant={"outline"}
								size={"full"}
								className="md:w-[387px]"
								onClick={() => {
									if (!details.hostel_no) {
										showHostelNotAlloted();
										return;
									}
									if (details.electricity_pay) return;
									navigate("electricity");
								}}
							>
								Electricity Fee
							</Button>
							{details.electricity_pay && (
								<img src="/img/check.svg" alt="checked" />
							)}
						</div>
					</div>
				</Card>
			</section>
		</>
	);
};

export default FeeDetails;
