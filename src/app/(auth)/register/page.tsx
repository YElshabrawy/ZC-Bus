'use client';
import Image from 'next/image';
import Link from 'next/link';
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
import axios from '@/lib/axios';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components/custom/PasswordInput';
import OTPVerificationForm from '@/components/custom/OTPVerificationForm';

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

export default function Register() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [openOtp, setOpenOtp] = useState<boolean>(false);
    const router = useRouter();

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
            <OTPVerificationForm
                email={form.getValues('email')}
                openOtp={openOtp}
                setOpenOtp={setOpenOtp}
                onSuccess={() => {
                    router.push('/login');
                }}
            />
        </>
    );
}
