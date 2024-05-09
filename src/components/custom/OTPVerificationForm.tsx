import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import axios from '@/lib/axios';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';

const OTPFormSchema = z.object({
    pin: z.string().min(4, {
        message: 'Your one-time password must be 4 characters.',
    }),
});

interface OTPVerificationFormProps {
    email: string;
    openOtp: boolean;
    setOpenOtp: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess: () => void;
}

const OTPVerificationForm = ({
    email,
    openOtp,
    setOpenOtp,
    onSuccess,
}: OTPVerificationFormProps) => {
    const [resendTimer, setResendTimer] = useState(0);
    const otpForm = useForm<z.infer<typeof OTPFormSchema>>({
        resolver: zodResolver(OTPFormSchema),
        defaultValues: {
            pin: '',
        },
    });
    // reset everything on initial render
    useEffect(() => {
        if (openOtp) {
            otpForm.reset();
            // setResendTimer(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openOtp]);

    async function onOTPSubmit(values: z.infer<typeof OTPFormSchema>) {
        // if (initialResend) startResendTimer();
        try {
            const res = await axios.post('/user/verify-otp/', {
                // email: form.getValues('email'),
                email: email,
                otp: values.pin,
            });
            if (res.status === 200) {
                setOpenOtp(false);
                // reset the form
                otpForm.reset();
                setResendTimer(0);
                onSuccess();
                // router.push('/login');
            }
        } catch (error) {
            interface ErrorResponse {
                otp?: string[]; // Define the structure of your response data here
            }
            if (error instanceof AxiosError) {
                const err = error as AxiosError;
                const otpMessage =
                    (err.response?.data as ErrorResponse)?.otp?.[0] ??
                    'Invalid OTP';
                otpForm.setError('pin', {
                    type: 'manual',
                    message: otpMessage,
                });
            } else {
                console.log(error);
            }
        }
    }
    function startResendTimer() {
        setResendTimer(60); // Set initial timer value to 60 seconds
    }
    async function resendOTP(email: string) {
        try {
            // only send if the timer is 0
            if (resendTimer > 0) return;
            await axios.post('user/resend-otp/', { email });
            console.log('otp sent');
            startResendTimer(); // Start the resend timer
        } catch (error) {
            if (error instanceof AxiosError) {
                const err = error as AxiosError;
                if (err.response?.status === 404) {
                    otpForm.setError('pin', {
                        type: 'manual',
                        message: 'User not found',
                    });
                    return;
                }
                return;
            }
            console.error('Error resending OTP:', error);
        }
    }
    useEffect(() => {
        let timerId: NodeJS.Timeout;

        // Decrement the timer every second until it reaches 0
        if (resendTimer > 0) {
            timerId = setTimeout(() => {
                setResendTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        // Clear the timer when component unmounts
        return () => clearTimeout(timerId);
    }, [resendTimer]); // Run effect whenever resendTimer changes

    // Handler for resending OTP
    function handleResendOTP() {
        if (resendTimer === 0) {
            // resendOTP(form.getValues('email'));
            resendOTP(email);
        }
    }

    function sendOTP() {
        resendOTP(email);
    }
    return (
        <Drawer open={openOtp} onOpenChange={setOpenOtp}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm flex flex-col items-center">
                    <DrawerHeader className="flex flex-col items-center text-center">
                        <DrawerTitle>Verify your email address</DrawerTitle>
                        <DrawerDescription className="text-center">
                            We will send a one-time password to your email:{' '}
                            <span className="text-primary">{email}</span>
                        </DrawerDescription>
                    </DrawerHeader>
                    <Form {...otpForm}>
                        <form
                            onSubmit={otpForm.handleSubmit(onOTPSubmit)}
                            className="w-full space-y-6 flex flex-col items-center justify-center pb-5"
                        >
                            <Button
                                disabled={resendTimer > 0}
                                onClick={handleResendOTP}
                                type="button"
                            >
                                {resendTimer > 0
                                    ? `Resend OTP in ${resendTimer} seconds`
                                    : 'Send OTP'}
                            </Button>
                            <FormField
                                control={otpForm.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem className="w-full flex flex-col items-center ">
                                        <FormLabel>One-Time Password</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={4} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormDescription>
                                            Please enter the one-time password
                                            sent to your email.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className="w-full" type="submit">
                                Verify
                            </Button>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default OTPVerificationForm;
