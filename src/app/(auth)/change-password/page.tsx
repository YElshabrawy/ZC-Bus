'use client';
import { Button } from '@/components/ui/button';
import { set, useForm } from 'react-hook-form';
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
import { AxiosError } from 'axios';
import { PasswordInput } from '@/components/custom/PasswordInput';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

const formSchema = z.object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmNewPassword: z.string().min(8),
});

export default function ForgetPassword() {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const axiosProtected = useAxiosAuth();
    const router = useRouter();
    const session = useSession();
    const { toast } = useToast();
    if (!session || !session.data?.user) {
        router.push('/login');
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const uid = session.data?.user.user.id;
            if (!uid) {
                throw new Error('User ID not found');
            }
            await axiosProtected.patch(`/user/${uid}/change-password/`, {
                old_password: values.oldPassword,
                new_password: values.newPassword,
                confirm_password: values.confirmNewPassword,
            });
            toast({
                title: 'Success',
                variant: 'success',
                description: 'Password changed successfully',
                action: (
                    <ToastAction
                        altText="Home"
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        Home
                    </ToastAction>
                ),
            });
            // clear form password fields
            form.setValue('oldPassword', '');
            form.setValue('newPassword', '');
            form.setValue('confirmNewPassword', '');
            setErrorMsg(null);
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
                                Change Password
                            </h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your old and new password below to change
                                your password
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
                                        <div className={cn('space-y-4')}>
                                            <FormField
                                                control={form.control}
                                                name="oldPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Old Password
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
                                                Change Password
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
