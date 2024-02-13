import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Card} from "@/components/ui/card.tsx";
import {toast} from "sonner";
import authService from "@/services/AuthService.ts";
import {useDispatch} from "react-redux";
import {login} from "@/store/authSlice.ts";


const LoginValidation = z.object({
    registration: z.string().min(3).max(255),
    password: z.string().min(8).max(255),
});

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formState = useForm<z.infer<typeof LoginValidation>>({
        resolver: zodResolver(LoginValidation),
        defaultValues: {
            registration: '',
            password: '',
        }
    })

    const onSubmit = (values: z.infer<typeof LoginValidation>) => {
        console.log(values)
        toast.promise(authService.loginWithRegAndPassword({
            registrationNumber: values.registration,
            password: values.password
        }), {
            loading: 'Logging in...',
            success: (res) => {
                dispatch(login(res))
                navigate("/", {replace: true})
                return 'Logged in successfully';
            },
            error: error => {
                console.log(error);
                if (error.message) {
                    const message = error.message.toString();
                    return message.replace('email', 'registration number');
                }
                return error.message;
            }
        });

    }

    return (
        <main
            className="w-full overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center gap-l px-m py-sm custom-scrollbar">
            <img src={'/img/logo.png'} alt={'logo'} width={'72'} height={'85.53'}
            />
            <Card className={'px-xl pt-4xl pb-3xl w-full md:w-[414px]'}>
                <Form {...formState}>
                    <form onSubmit={formState.handleSubmit(onSubmit)}
                          className={'flex flex-col'}>
                        <div className="fields space-y-l">
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

                            {/*Password Field */}
                            <FormField
                                control={formState.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={'password'} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type={'submit'} className={'mt-3xl mb-sm'}>Log in</Button>
                        <div className="mx-auto">
                            <Link to={'/forgot-password'}>
                                <Button variant={"link"}>Forgot password? </Button>
                            </Link>
                        </div>
                    </form>
                </Form>
            </Card>
            <div className="flex items-center mt-xs gap-1">
                <strong className="text-gray">Don't have an account? </strong>
                <Link to={'/register'}>
                    <Button variant={'link'}> Register</Button>
                </Link>
            </div>
        </main>
    )
}