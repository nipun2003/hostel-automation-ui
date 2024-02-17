import * as React from "react";
import { cn } from "@/lib/utils";
const Container4 = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"w-full md:col-span-8 md:col-start-3 lg:col-start-5 lg:col-span-4 md:min-w-[414px] overflow-y-auto overflow-x-hidden custom-scrollbar",
			className
		)}
		{...props}
	/>
));
Container4.displayName = "Container4";

export default Container4;
