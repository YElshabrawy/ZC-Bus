'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const formSchema = z.object({
    route: z.string({
        required_error: 'Please select a route',
    }),
    email: z
        .string({
            required_error: 'Please enter your ZC email',
            message: 'Please enter a valid ZC email address',
        })
        .email(),
    sid: z.string({
        required_error: 'Please enter your student ID',
        message: 'Please enter a valid student ID',
    }),
    department: z.string({
        required_error: 'Please enter your department',
    }),
    phone: z.string({
        required_error: 'Please enter your phone number',
        message: 'Please enter a valid phone number',
    }),
});
export default function Home() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // defaultValues: {
        //     seats: 1,
        //     date: new Date().toISOString().split('T')[0],
        // },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
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
                                                                S4 - Mohandessin
                                                            </SelectItem>
                                                            <SelectItem value="S5">
                                                                S5 - Nasr City
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    {/* Email */}
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
                                    {/* Student ID */}
                                    <FormField
                                        control={form.control}
                                        name="sid"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Student ID
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
                                    {/* Department */}
                                    <FormField
                                        control={form.control}
                                        name="department"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Department
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a department" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <FormMessage />
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Departments
                                                            </SelectLabel>
                                                            <SelectItem value="Engineering">
                                                                Engineering
                                                            </SelectItem>
                                                            <SelectItem value="Science">
                                                                Science
                                                            </SelectItem>
                                                            <SelectItem value="Business">
                                                                Business
                                                            </SelectItem>
                                                            <SelectItem value="CSAI">
                                                                CSAI
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    {/* Phone */}
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
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
        </>
    );
}
