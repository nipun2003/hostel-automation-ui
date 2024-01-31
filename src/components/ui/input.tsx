import * as React from "react"
import {useState} from "react"

import {cn} from "@/lib/utils"
import {cva} from "class-variance-authority";
import {FiEye, FiEyeOff} from "react-icons/fi";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

const inputVariants = cva(
    "w-full text-base text-foreground rounded-sm border border-input placeholder:text-gray placeholder:text-base",
    {
        variants: {
            variant: {
                default:
                    "focus:outline-none py-3 px-4 ",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, ...props}, ref) => {
        const [passwordVisible, setPasswordVisible] = useState(false);
        const passwordField = type === "password";
        return (
            <div className={"w-full relative"}>
                {passwordField && (
                    <div
                        className="pass-icon p-1 cursor-pointer absolute right-2 top-2.5"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                        {passwordVisible ? (
                            <FiEye size={18} color="#667085"/>
                        ) : (
                            <FiEyeOff size={18} color="#667085"/>
                        )}
                    </div>
                )}
                <input
                    type={!passwordField ? type : passwordVisible ? "text" : "password"}
                    className={cn(inputVariants({variant: "default", className}))}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
)
Input.displayName = "Input"

export {Input}
