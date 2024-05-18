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
import { BusFrontIcon, Ticket } from 'lucide-react';
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
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

const formSchema = z.object({
    route: z.string({
        required_error: 'Please select a route',
    }),
    destination: z.enum(['From University', 'To University']),
    date: z
        .string({
            required_error: 'Please select a date',
        })
        .refine((value) => {
            const selectedDate = new Date(value);
            const currentDate = new Date();
            selectedDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);
            return selectedDate >= currentDate;
        }, 'Date must be today or in the future'),
});
interface IProps {
    routes: TBusRoute[];
    wallet_balance: string;
}

const TICKET_PRICE = 30;
const ReserveForm = ({ routes, wallet_balance }: IProps) => {
    const axios = useAxiosAuth();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: new Date().toISOString().split('T')[0],
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const subObj = {
            bus_route: parseInt(values.route),
            date: values.date,
            destination: values.destination,
        };
        // POst to the backend
        try {
            const res = await axios.post('/bus/bus-route/reserve', subObj);
            if (res.status === 201) {
                console.log(res.data);
                toast({
                    title: 'Success',
                    description: `Your Ticket ID = ${res.data.id} 🥳`,
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
            const err = e as AxiosError<{ non_field_errors: string[] }>;
            if (err.response) {
                toast({
                    title: 'Error',
                    description:
                        err.response?.data?.non_field_errors[0] ||
                        'An error occurred',
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
                    description: 'A server error occurred',
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
        <>
            <div className="mb-4">
                <Card x-chunk="dashboard-01-chunk-0" className="">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-lg font-medium">
                            Balance
                        </CardTitle>
                        <Badge variant="outline" color="primary">
                            EGP {wallet_balance}
                        </Badge>
                    </CardHeader>
                </Card>
            </div>
            <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                        Reserve a Trip
                    </CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <div className="">
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col md:flex-row items-start md:space-x-6 space-y-6 md:space-y-0"
                            >
                                <div className="flex flex-col space-y-4 w-full md:w-2/3">
                                    {/* Route Select */}
                                    <FormField
                                        control={form.control}
                                        name="route"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Route</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
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
                                                            {routes.map(
                                                                (route) => (
                                                                    <SelectItem
                                                                        key={
                                                                            route.id
                                                                        }
                                                                        value={route.id.toString()}
                                                                    >
                                                                        {
                                                                            route.code
                                                                        }{' '}
                                                                        -{' '}
                                                                        {
                                                                            route.destination
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    {/* Path Select */}
                                    <FormField
                                        control={form.control}
                                        name="destination"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Trip Path</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a path" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <FormMessage />

                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Path
                                                            </SelectLabel>
                                                            <SelectItem value="From University">
                                                                From University
                                                            </SelectItem>
                                                            <SelectItem value="To University">
                                                                To University
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Date Picker */}
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* divider */}
                                <div className="self-center hidden md:block border-l border-gray-300 h-56" />
                                {/* Recipt */}
                                <div className="flex flex-col space-y-4 flex-grow w-full md:w-1/3 bg-gray-100 dark:bg-transparent p-4 rounded-md">
                                    <h2 className="text-lg font-medium">
                                        Reservation Recipt 💰
                                    </h2>
                                    <div className="flex flex-row justify-between">
                                        <span>Route</span>
                                        <span>
                                            {routes.find(
                                                (route) =>
                                                    route.id.toString() ===
                                                    form.watch('route')
                                            )?.destination || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <span>Path</span>
                                        <span>
                                            {form.watch('destination') || 'N/A'}
                                        </span>
                                    </div>

                                    <div className="flex flex-row justify-between">
                                        <span>Date</span>
                                        <span>
                                            {form.watch('date') || 'N/A'}
                                        </span>
                                    </div>
                                    {/* Summary */}
                                    <div className="flex flex-row justify-between font-bold">
                                        <span>Total</span>
                                        <span>EGP {TICKET_PRICE}</span>
                                    </div>
                                    <Button
                                        className="w-full self-end mt-auto"
                                        type="submit"
                                    >
                                        Reserve
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
};

export default ReserveForm;
