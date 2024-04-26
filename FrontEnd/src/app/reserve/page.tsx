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
// import { Input, Select } from '@/components/ui/form'; // Import Input and Select for the form
import { Ticket } from 'lucide-react';

export default function Home() {
    return (
        <>
            <MaxWidthWrapper className="mt-8">
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
                    <CardContent className="flex flex-col space-y-4">
                        {/* Origin Input */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="origin"
                                className="text-sm font-medium mb-1"
                            >
                                Route
                            </label>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a route" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Routes</SelectLabel>
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
                        </div>
                        {/* Destination Input */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="path"
                                className="text-sm font-medium mb-1"
                            >
                                Trip Path
                            </label>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a path" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Path</SelectLabel>
                                        <SelectItem value="from">
                                            From University
                                        </SelectItem>
                                        <SelectItem value="to">
                                            To University
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {/* <Select className="w-full">
                                <option value="S5">S5 - Nasr City (To)</option>
                                <option value="S1">S1 - Haram (From)</option>
                            </Select> */}
                        </div>
                        {/* Datepicker (replace with your preferred datepicker component) */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="date"
                                className="text-sm font-medium mb-1"
                            >
                                Date
                            </label>
                            <Input type="date" id="date" className="w-full" />
                        </div>
                        <Button className="mt-4 w-fit self-end">Reserve</Button>
                    </CardContent>
                </Card>
            </MaxWidthWrapper>
        </>
    );
}
