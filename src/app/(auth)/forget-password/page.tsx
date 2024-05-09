'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import OTPVerificationForm from '@/components/custom/OTPVerificationForm';
import { AxiosError } from 'axios';
import { PasswordInput } from '@/components/custom/PasswordInput';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
    email: z.string().email(),
    newPassword: z.string().min(8),
    confirmNewPassword: z.string().min(8),
});

export default function ForgetPassword() {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [openOtp, setOpenOtp] = useState<boolean>(false);
    const [verified, setVerified] = useState<boolean>(false);
    const router = useRouter();
    const session = useSession();
    if (!!session && !!session.data?.user) {
        router.push('/');
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.patch('/user/update-password/', {
                email: values.email,
                password: values.newPassword,
                confirm_password: values.confirmNewPassword,
            });
            router.push('/login');
        } catch (error) {
            if (error instanceof AxiosError) {
                const err = error as AxiosError;
                if (err.response?.status === 400) {
                    const dta = err.response?.data as {
                        [key: string]: unknown;
                    };
                    setErrorMsg((dta.non_field_errors as string[])[0]);
                } else {
                    setErrorMsg('An error occurred');
                }
            } else {
                setErrorMsg('An error occurred');
            }
            console.error("ForgetPassword's onSubmit error: ", error);
        }
    }

    return (
        <>
            <div className="w-full  lg:min-h-[600px] xl:min-h-[89.6vh]">
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">
                                Forget Password
                            </h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your email and we will send you an otp to
                                reset your password
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
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                onChange={() => setErrorMsg(null)}
                            >
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="s-john.doe@zewailcity.edu.eg"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            className="w-full"
                                            onClick={() => {
                                                setOpenOtp(true);
                                            }}
                                        >
                                            Send OTP
                                        </Button>

                                        <div
                                            className={cn('space-y-4', {
                                                hidden: !verified,
                                            })}
                                        >
                                            <FormField
                                                control={form.control}
                                                name="newPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            New Password
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
                                            <FormField
                                                control={form.control}
                                                name="confirmNewPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Confirm New Password
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
                                            <Button
                                                type="submit"
                                                className="w-full"
                                            >
                                                Reset Password
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <OTPVerificationForm
                openOtp={openOtp}
                setOpenOtp={setOpenOtp}
                email={form.getValues('email')}
                onSuccess={() => {
                    setVerified(true);
                }}
            />
        </>
    );
}
