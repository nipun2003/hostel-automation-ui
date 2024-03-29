import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:opacity-90",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground",
				destructive: "bg-destructive text-destructive-foreground",
				outline:
					"border border-primary bg-background hover:bg-accent hover:text-accent-foreground",
				secondary: "bg-secondary text-secondary-foreground hover:opacity-80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-secondary text-sm  underline-offset-4 hover:underline px-0 py-0",
			},
			size: {
				default: "px-l py-sm font-semibold",
				sm: "px-sm font-medium text-sm",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
				link: "px-0 py-0 font-medium",
				full: "w-full px-l py-sm font-semibold",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		const computedSize = variant === "link" && size !== "link" ? "link" : size;
		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size: computedSize, className })
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
