const BusySpinner = ({ message }: { message?: string }) => {
	return (
		<div className="z-30 absolute w-full h-screen top-0 left-0 bg-gray/20">
			<div className="loading-spinner  w-[50px] h-[50px] border-[10px] border-divider border-t-sm border-t-primary rounded-full animate-spin relative opacity-100 top-1/2 left-1/2"></div>
			<div className="message absolute w-full top-55% pl-10 opacity-100 font-semibold text-black">
				<p className={"text-center"}>{message}</p>
			</div>
		</div>
	);
};

export default BusySpinner;
