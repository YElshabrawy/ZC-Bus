'use client';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components/custom/PasswordInput';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';

const formSchema = z.object({
    first_name: z
        .string({
            message: 'First name is required',
        })
        .min(1),
    last_name: z
        .string({
            message: 'Last name is required',
        })
        .min(1),
    email: z
        .string({
            message: 'Email is required',
        })
        .email(),
    password: z
        .string({
            message: 'Password is required',
        })
        .min(8, { message: 'Password must be at least 8 characters' }),
    confirm_password: z
        .string({
            message: 'Confirm password is required',
        })
        .min(8, { message: 'Password must be at least 8 characters' }),
});

const OTPFormSchema = z.object({
    pin: z.string().min(4, {
        message: 'Your one-time password must be 4 characters.',
    }),
});

export default function Register() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const otpForm = useForm<z.infer<typeof OTPFormSchema>>({
        resolver: zodResolver(OTPFormSchema),
        defaultValues: {
            pin: '',
        },
    });
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [openOtp, setOpenOtp] = useState<boolean>(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [initialResend, setInitialResend] = useState(true);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.post('user/registration/', values);
            // send otp and open otp drawer
            const otp = await axios.post('user/resend-otp/', {
                email: values.email,
            });
            setOpenOtp(true);
            // router.push('/login');
        } catch (error) {
            if (error instanceof AxiosError) {
                const err = error as AxiosError;
                // now for each error add it to the form field according to its name
                Object.entries(
                    err.response?.data as { [key: string]: unknown }
                ).forEach(([key, value]) => {
                    // check if key = one of the form names
                    if (
                        formSchema.shape[key as keyof typeof formSchema.shape]
                    ) {
                        form.setError(key as keyof typeof formSchema.shape, {
                            type: 'manual',
                            message: (value as string[])[0] ?? '',
                        });
                    } else {
                        setErrorMsg((value as string[])[0] ?? '');
                    }
                });
            } else {
                console.log(error);
            }
        }

        // redirect('/login');
    }
    async function onOTPSubmit(values: z.infer<typeof OTPFormSchema>) {
        if (initialResend) startResendTimer();
        setInitialResend(false);
        try {
            const res = await axios.post('/user/verify-otp/', {
                email: form.getValues('email'),
                otp: values.pin,
            });
            if (res.status === 200) {
                setOpenOtp(false);
                router.push('/login');
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
            await axios.post('user/resend-otp/', { email });
            startResendTimer(); // Start the resend timer
        } catch (error) {
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
            resendOTP(form.getValues('email'));
        }
    }

    return (
        <>
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[89.6vh]">
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Sign Up</h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your information to create an account
                            </p>
                        </div>
                        {!!errorMsg && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{errorMsg}</AlertDescription>
                            </Alert>
                        )}
                        <Form {...form}>
                            <div className="">
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex flex-col space-y-4 w-full">
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* First Name */}
                                            <FormField
                                                control={form.control}
                                                name="first_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            First Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder=""
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {/* Last Name */}
                                            <FormField
                                                control={form.control}
                                                name="last_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Last Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder=""
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Email */}
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder=""
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Password */}
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        {/* <Input
                                                        type="password"
                                                        placeholder=""
                                                        {...field}
                                                    /> */}
                                                        <PasswordInput
                                                            placeholder=""
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Confirm Password */}
                                        <FormField
                                            control={form.control}
                                            name="confirm_password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Confirm Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <PasswordInput
                                                            placeholder=""
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Submit Button */}
                                        <Button className="w-fit" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Form>
                        {/* <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    id="first-name"
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="s-john.doe@zewailcity.edu.eg"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                    </div> */}
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <Link href="login" className="underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden bg-muted lg:block">
                    <Image
                        src="/zc-main.jpg"
                        alt="Image"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
            <Drawer open={openOtp} onOpenChange={setOpenOtp}>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm flex flex-col items-center">
                        <DrawerHeader>
                            <DrawerTitle>Verify your email address</DrawerTitle>
                            <DrawerDescription>
                                We have sent a verification code to your email
                                address. Please enter the code below.
                            </DrawerDescription>
                        </DrawerHeader>
                        <Form {...otpForm}>
                            <form
                                onSubmit={otpForm.handleSubmit(onOTPSubmit)}
                                className="w-full space-y-6 flex flex-col items-center justify-center"
                            >
                                <FormField
                                    control={otpForm.control}
                                    name="pin"
                                    render={({ field }) => (
                                        <FormItem className="w-full flex flex-col items-center ">
                                            <FormLabel>
                                                One-Time Password
                                            </FormLabel>
                                            <FormControl>
                                                <InputOTP
                                                    maxLength={4}
                                                    {...field}
                                                >
                                                    <InputOTPGroup>
                                                        <InputOTPSlot
                                                            index={0}
                                                        />
                                                        <InputOTPSlot
                                                            index={1}
                                                        />
                                                        <InputOTPSlot
                                                            index={2}
                                                        />
                                                        <InputOTPSlot
                                                            index={3}
                                                        />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormDescription>
                                                Please enter the one-time
                                                password sent to your email.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="w-full flex items-center justify-between pb-5">
                                    <Button type="submit">Verify</Button>
                                    <Button
                                        disabled={
                                            resendTimer > 0 || initialResend
                                        }
                                        variant={'secondary'}
                                        onClick={handleResendOTP}
                                        type="button"
                                    >
                                        {resendTimer > 0
                                            ? `Resend OTP in ${resendTimer} seconds`
                                            : 'Resend OTP'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
