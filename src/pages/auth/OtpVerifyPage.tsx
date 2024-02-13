import {Card} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from "zod";
import {Navigate, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import authService from "@/services/AuthService.ts";
import useRegister from "@/hooks/useRegister.ts";
import {useEffect, useState} from "react";

const OtpValidation = z.object({
    otp: z.string().length(6, {message: 'OTP must be 6 characters long'}),
});

export default function OtpVerifyPage() {
    const navigate = useNavigate();
    const {registerData} = useRegister();
    const [countDown, setCountDown] = useState(30)
    const [running, setRunning] = useState(true);

    const formState = useForm<z.infer<typeof OtpValidation>>({
        resolver: zodResolver(OtpValidation),
        defaultValues: {
            otp: '',
        }
    })

    useEffect(() => {
        if (running) {
            const timer = setInterval(() => {
                setCountDown(prevCountdown => {
                    if (prevCountdown === 0) {
                        clearInterval(timer);
                        // Handle countdown completion here
                        setRunning(false);
                        return 0;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);

            // Cleanup function to clear interval when component unmounts
            return () => clearInterval(timer);
        }
    }, [running]);

    const userId = registerData.userId;
    if (!registerData.student || !userId) {
        toast.error('Something went wrong, please try again.');
        return <Navigate to={'/register'} state={null} replace={true}/>
    }

    const phoneNo = registerData.student.phone_no;
    const name = registerData.student.name || "";

    const onSubmit = (values: z.infer<typeof OtpValidation>) => {
        console.log(values)
        if (!userId) return toast.error('User not found');
        // verify otp
        toast.promise(authService.verifyOtp({userId, name, otp: values.otp}), {
            loading: 'Verifying OTP...',
            success: (res) => {
                console.log(res)
                if (!res) return toast.error('Failed to verify OTP');
                navigate("/register/create-password",
                    {
                        replace: true
                    })
                return 'OTP verified successfully';
            },
            error: 'Failed to verify OTP'
        });
    }

    const resendOtp = () => {
        if (!userId) return toast.error('User not found');
        toast.promise(authService.sendOtp(phoneNo), {
            loading: 'Resending OTP...',
            success: (res) => {
                console.log(res)
                if (!res) return toast.error('Failed to resend OTP');
                setCountDown(30);
                setRunning(true);
                return 'OTP sent successfully';
            },
            error: error => error.message
        });
    }
    return <main
        className="w-full overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center gap-xl px-m py-sm custom-scrollbar">
        <Card className={'px-xl pt-4xl pb-3xl w-full md:w-[414px]'}>
            <Form {...formState}>
                <form onSubmit={formState.handleSubmit(onSubmit)}
                      className={'flex flex-col gap-3xl'}>
                    <div className="spacy-y-xs">
                        <h1>Enter verification code</h1>
                        <span className={'text-gray'}>Enter the 6-digit code sent to {phoneNo}</span>
                    </div>
                    {/*Registration Number field*/}
                    <FormField
                        control={formState.control}
                        name="otp"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Verification code</FormLabel>
                                <FormControl>
                                    <Input {...field} maxLength={6}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type={'submit'} size={"full"}>Continue</Button>
                </form>
            </Form>
            <div className="flex flex-col w-full items-center mt-ml">
                <Button variant={"link"} disabled={countDown > 0} className={'space-x-1'} onClick={resendOtp}>
                    <span>Resend</span>
                    {countDown > 0 && <span>{" "} in {countDown}</span>}  </Button>
            </div>
        </Card>
    </main>
}