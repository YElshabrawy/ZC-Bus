'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { BusFrontIcon } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { TBusRoute } from '@/types/bus';
import { AxiosError } from 'axios';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { ToastAction } from '../ui/toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    route: z.string({
        required_error: 'Please select a route',
    }),
});
interface IProps {
    routes: TBusRoute[];
    userID: number;
}
const SubscribeForm = ({ routes, userID }: IProps) => {
    const axios = useAxiosAuth();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // defaultValues: {
        //     seats: 1,
        //     date: new Date().toISOString().split('T')[0],
        // },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const subObj = {
            user: userID,
            bus_route: parseInt(values.route),
        };
        // POst to the backend
        try {
            const res = await axios.post('/bus/bus-route/subscribe', subObj);
            if (res.status === 201) {
                toast({
                    title: 'Success',
                    description: `You have subscribed successfully! 🥳`,
                    variant: 'success',
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
            }
        } catch (e) {
            const err = e as AxiosError<{ detail?: string }>;
            if (err.response) {
                toast({
                    title: 'Error',
                    description: err.response?.data?.detail,
                    variant: 'destructive',
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
            } else {
                toast({
                    title: 'Error',
                    description: 'An error occurred',
                    variant: 'destructive',
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
            }
        }
    }
    return (
        <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                    Subscribe to a Route
                </CardTitle>
                <BusFrontIcon className="h-4 w-4 text-muted-foreground" />
                {/* <Ticket className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <div className="">
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col space-y-4 w-full">
                                {/* Route Select */}
                                <FormField
                                    control={form.control}
                                    name="route"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Route</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a route" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <FormMessage />

                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Routes
                                                        </SelectLabel>
                                                        {routes.map((route) => (
                                                            <SelectItem
                                                                key={route.id}
                                                                value={route.id.toString()}
                                                            >
                                                                {route.code} -{' '}
                                                                {
                                                                    route.destination
                                                                }
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />

                                {/* Submit Button */}
                                <Button className="w-fit" type="submit">
                                    Submit
                                </Button>
                                {/* Seats Input */}
                                {/* <FormField
                                        control={form.control}
                                        name="seats"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Number of Seats
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} */}
                            </div>
                        </form>
                    </div>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SubscribeForm;
