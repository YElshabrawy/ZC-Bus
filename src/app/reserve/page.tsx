'use client';
import MaxWidthWrapper from '@/components/custom/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Ticket } from 'lucide-react';
import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
    route: z.string({
        required_error: 'Please select a route',
    }),
    path: z.string({
        required_error: 'Please select a path',
    }),
    seats: z.coerce.number().min(1).max(10),
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
export default function Home() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            seats: 1,
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(values, null, 2)}
                    </code>
                </pre>
            ),
        });
    }
    return (
        <>
            <MaxWidthWrapper className="my-8">
                <h1 className="text-3xl font-semibold mb-4">
                    Hello, <span className="text-primary">Youssef</span>
                </h1>
                <div className="mb-4">
                    <Card x-chunk="dashboard-01-chunk-0" className="">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-lg font-medium">
                                Balance
                            </CardTitle>
                            <Badge variant="outline" color="primary">
                                EGP 231.89
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
                                                                <SelectItem value="S1">
                                                                    S1 - Haram
                                                                </SelectItem>
                                                                <SelectItem value="S2">
                                                                    S2 - Maadi
                                                                </SelectItem>
                                                                <SelectItem value="S3">
                                                                    S3 - Shubra
                                                                </SelectItem>
                                                                <SelectItem value="S4">
                                                                    S4 -
                                                                    Mohandessin
                                                                </SelectItem>
                                                                <SelectItem value="S5">
                                                                    S5 - Nasr
                                                                    City
                                                                </SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        {/* Path Select */}
                                        <FormField
                                            control={form.control}
                                            name="path"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Trip Path
                                                    </FormLabel>
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
                                                                <SelectItem value="from">
                                                                    From
                                                                    University
                                                                </SelectItem>
                                                                <SelectItem value="to">
                                                                    To
                                                                    University
                                                                </SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        {/* Seats Input */}
                                        <FormField
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
                                    <div className="hidden md:block border-l border-gray-300 h-56" />
                                    {/* Recipt */}
                                    <div className="flex flex-col space-y-4 flex-grow w-full md:w-1/3 bg-gray-100 dark:bg-transparent p-4 rounded-md">
                                        <h2 className="text-lg font-medium">
                                            Reservation Recipt 💰
                                        </h2>
                                        <div className="flex flex-row justify-between">
                                            <span>Route</span>
                                            <span>
                                                {form.watch('route') || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <span>Path</span>
                                            <span>
                                                {form.watch('path') || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <span>Seats</span>
                                            {/* if int watch else return zero */}
                                            <span>
                                                {parseInt(
                                                    String(form.watch('seats'))
                                                ) || 0}
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
                                            <span>
                                                EGP{' '}
                                                {(parseInt(
                                                    String(form.watch('seats'))
                                                ) || 0) * 60}
                                            </span>
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
            </MaxWidthWrapper>
        </>
    );
}
