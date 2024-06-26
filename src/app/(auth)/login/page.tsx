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
import { signIn, useSession } from 'next-auth/react';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components/custom/PasswordInput';
import OTPVerificationForm from '@/components/custom/OTPVerificationForm';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

interface IProps {
    searchParams?: Record<'callbackUrl' | 'error', string>;
}

export default function Login(props: IProps) {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [openOtp, setOpenOtp] = useState<boolean>(false);
    const router = useRouter();
    const session = useSession();
    if (!!session && !!session.data?.user) {
        router.push(props.searchParams?.callbackUrl ?? '/');
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { email, password } = values;
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl: props.searchParams?.callbackUrl ?? '/',
        });
        if (res?.error) {
            setErrorMsg(res.error);
            if (res.error.includes('verified')) {
                setOpenOtp(true);
            }
            return;
        }
        router.push(props.searchParams?.callbackUrl ?? '/');
    }

    return (
        <>
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[89.6vh]">
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Login</h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your email below to login to your ZC bus
                                account
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
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <Link
                                                href={'/forget-password'}
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    {/* <FormLabel>Password</FormLabel> */}
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
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Login
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
            <OTPVerificationForm
                email={form.getValues('email')}
                openOtp={openOtp}
                setOpenOtp={setOpenOtp}
                onSuccess={async () => {
                    const res = await signIn('credentials', {
                        email: form.getValues('email'),
                        password: form.getValues('password'),
                        redirect: false,
                        callbackUrl: props.searchParams?.callbackUrl ?? '/',
                    });
                    if (res?.error) {
                        setErrorMsg(res.error);

                        return;
                    }
                    router.push(props.searchParams?.callbackUrl ?? '/');
                }}
            />
        </>
    );
}
