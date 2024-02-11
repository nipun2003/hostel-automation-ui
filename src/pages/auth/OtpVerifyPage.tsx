import {Card} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from "zod";
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import authService from "@/services/AuthService.ts";

const OtpValidation = z.object({
    otp: z.string().length(6, {message: 'OTP must be 6 characters long'}),
});

export default function OtpVerifyPage() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const userId = state?.userId;
    const phoneNo = state?.phoneNo;
    const name = state?.name;
    const email = state?.email;
    const formState = useForm<z.infer<typeof OtpValidation>>({
        resolver: zodResolver(OtpValidation),
        defaultValues: {
            otp: '',
        }
    })

    const onSubmit = (values: z.infer<typeof OtpValidation>) => {
        console.log(values)
        if (!userId) return toast.error('User not found');
        // verify otp
        toast.promise(authService.verifyOtp({userId, name, email, otp: values.otp}), {
            loading: 'Verifying OTP...',
            success: (res) => {
                console.log(res)
                if (!res) return toast.error('Failed to verify OTP');
                navigate("/register/create-password", {state: {userId, phoneNo, name, email},replace: true})
                return 'OTP verified successfully';
            },
            error: 'Failed to verify OTP'
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
                    <div className="flex flex-col w-full items-center gap-ml">
                        <Button type={'submit'} size={"full"}>Continue</Button>
                        <Button variant={"link"}>Resend </Button>
                    </div>
                </form>
            </Form>
        </Card>
    </main>
}