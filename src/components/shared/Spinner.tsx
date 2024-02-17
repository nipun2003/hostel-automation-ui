const Spinner = ({ className }: { className?: string }) => {
	return (
		<div
			className={
				"loading-spinner w-l h-l border-[2px] border-t-[2px] border-t-primary border-primary-foreground rounded-full animate-spin relative opacity-100 " +
				className
			}
		/>
	);
};

export default Spinner;
