import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";


const LoginValidation = z.object({
    registration: z.string().min(3).max(255),
    password: z.string().min(8).max(255),
});

export default function Login() {

    const formState = useForm<z.infer<typeof LoginValidation>>({
        resolver: zodResolver(LoginValidation),
        defaultValues: {
            registration: '',
            password: '',
        }
    })

    const onSubmit = (values: z.infer<typeof LoginValidation>) => {
        console.log(values)
    }

    return (
        <main className="h-screen w-full overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center gap-l px-m py-sm custom-scrollbar">
            <img src={'/img/logo.png'} alt={'logo'} width={'72'} height={'85.53'}
            />
            <section className={'rounded-lg shadow-lg px-xl py-2xl w-full lg:max-w-[451px]'}>
                <Form {...formState}>
                    <form onSubmit={formState.handleSubmit(onSubmit)}
                          className={'flex flex-col gap-l '}>

                        {/*Registration Number field*/}
                        <FormField
                            control={formState.control}
                            name="registration"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Registration number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your registration" {...field} />
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
                                            type={'password'}
                                            placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type={'submit'}>Login</Button>
                        <div className="mx-auto">
                            <Link to={'/forgot-password'}>
                                <Button variant={"link"}>Forgot your password </Button>
                            </Link>
                        </div>
                    </form>
                </Form>
            </section>
            <div className="flex items-center">
                <strong className="text-gray">Don't have an account?</strong>
                <Link to={'/register'}>
                    <span className={'link'}>Register</span>
                </Link>
            </div>
        </main>
    )
}