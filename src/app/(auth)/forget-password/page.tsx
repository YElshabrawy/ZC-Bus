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

const formSchema = z.object({
    email: z.string().email(),
});

interface IProps {
    searchParams?: Record<'callbackUrl' | 'error', string>;
}

export default function ForgetPassword(props: IProps) {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [openOtp, setOpenOtp] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // await axios.post('user/resend-otp/', {
            //     email: values.email,
            // });
            setOpenOtp(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                const err = error as AxiosError;
                if (err.response?.status === 404) {
                    setErrorMsg('User not found');
                } else {
                    setErrorMsg('Something went wrong');
                }
            }
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
                                    </div>

                                    <Button type="submit" className="w-full">
                                        Send OTP
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Don&apos;t have an account?{' '}
                                    <Link
                                        href="/register"
                                        className="underline"
                                    >
                                        Sign up
                                    </Link>
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
                    console.log('success');
                }}
            />
        </>
    );
}
