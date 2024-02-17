import * as React from "react";
import { cn } from "@/lib/utils";
const Container8 = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"w-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 overflow-y-auto overflow-x-hidden custom-scrollbar",
			className
		)}
		{...props}
	/>
));
Container8.displayName = "Container4";

export default Container8;
