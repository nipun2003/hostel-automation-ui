import {useLocation, useNavigate} from "react-router-dom";
import {Student} from "@/utils/models.ts";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import authService from "@/services/AuthService.ts";
import {toast} from "sonner";

export default function AccountDetails() {
    const {state} = useLocation();
    const student = state?.user as Student;
    const navigate = useNavigate();

    const sendOtp = () => {
        // send otp to the mobile number
        if (!student) return;
        console.log(student.phone_no);
        toast.promise(authService.sendOtp(student.phone_no), {
            loading: 'Sending OTP...',
            success: res => {
                console.log(res);
                if (!res) return toast.error('Failed to send OTP');
                navigate('/register/verify', {
                    state: {
                        userId: res, phoneNo: student.phone_no,
                        name: student.name, email: student.email
                    }
                });
                return 'OTP sent to your mobile number: ' + student.phone_no;
            },
            error: 'Failed to send OTP'
        });
    }
    return <main
        className={'w-full h-full overflow-y-auto flex flex-col justify-center items-center px-m py-sm custom-scrollbar '}>
        <Card className={'px-3xl pt-4xl pb-5xl w-full md:w-[650px] lg:w-[850px] space-y-5xl'}>
            <div className="details flex flex-col gap-4xl">
                <h1>Account Details</h1>
                <div className="grid md:grid-cols-2 gap-x-4xl gap-y-xl">
                    <div className="flex flex-col w-full gap-s">
                        <Label htmlFor={'name'}>Registration number</Label>
                        <Input defaultValue={student?.reg_no} readOnly={true} className={'cursor-default'}/>
                    </div>
                    <div className="flex flex-col w-full gap-s">
                        <Label htmlFor={'name'}>Batch</Label>
                        <Input defaultValue={student?.batch || ""} readOnly={true} className={'cursor-default'}/>
                    </div>
                    <div className="flex flex-col w-full gap-s">
                        <Label htmlFor={'name'}>Name</Label>
                        <Input defaultValue={student?.name} readOnly={true} className={'cursor-default'}/>
                    </div>
                    <div className="flex flex-col w-full gap-s">
                        <Label htmlFor={'name'}>Branch</Label>
                        <Input defaultValue={student?.branch?.name || ""} readOnly={true} className={'cursor-default'}/>
                    </div>
                    <div className="flex flex-col w-full gap-s">
                        <Label htmlFor={'name'}>Mobile number</Label>
                        <Input defaultValue={student?.phone_no} readOnly={true} className={'cursor-default'}/>
                    </div>
                    <div className="flex flex-col w-full gap-s">
                        <Label htmlFor={'name'}>Email Id</Label>
                        <Input defaultValue={student?.email} readOnly={true} className={'cursor-default'}/>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-fit md:max-w-[387px] flex flex-col items-center justify-center gap-ml">
                <Button type={'submit'} size={"full"} onClick={sendOtp}>Continue</Button>
                <span className={'text-gray'}>OTP will be sent for verification on your mobile number</span>
            </div>
        </Card>
    </main>
}