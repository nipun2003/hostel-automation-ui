import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import authService from "@/services/AuthService.ts";
import {toast} from "sonner";

const RegisterValidation = z.object({
    registration: z.string().length(11, {message: 'Registration number must be 11 characters long'}),
});

export default function ForgotPassword() {
    const navigate = useNavigate();

    const formState = useForm<z.infer<typeof RegisterValidation>>({
        resolver: zodResolver(RegisterValidation),
        defaultValues: {
            registration: "",
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterValidation>) => {
        console.log(values)
        toast.promise(authService.checkRegForForgotPassword(values.registration), {
            loading: 'Loading...',
            success: (res) => {
                navigate("/login", {replace: true})
                return `An email is sent to ${res.email} with a link to reset your password`
            },
            error: error => {
                return error.message
            }
        });
    }
    return <main
        className="w-full overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center gap-xl px-m py-sm custom-scrollbar">
        <Card className={'px-xl pt-4xl pb-3xl w-full md:w-[414px]'}>
            <Form {...formState}>
                <form onSubmit={formState.handleSubmit(onSubmit)}
                      className={'flex flex-col gap-3xl'}>
                    <div>
                        <h1>Forgot Password</h1>
                        <span className={'text-gray'}>A verification email will be sent to your registered email</span>
                    </div>
                    {/*Registration Number field*/}
                    <FormField
                        control={formState.control}
                        name="registration"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Registration number</FormLabel>
                                <FormControl>
                                    <Input {...field} maxLength={11}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type={'submit'}>Continue</Button>
                </form>
            </Form>
        </Card>
        <div className="flex items-center gap-1">
            <strong className="text-gray">Remember your password?</strong>
            <Button variant={'link'} onClick={() => navigate(-1)}>Login</Button>
        </div>
    </main>
}