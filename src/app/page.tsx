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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DollarSign, BusIcon, Ticket, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <MaxWidthWrapper className="mt-8">
                <h1 className="text-3xl font-semibold mb-4">
                    Hello, <span className="text-primary">Youssef</span> 🎉
                </h1>
                {/* Balance card */}
                <div className="mb-4">
                    <Card x-chunk="dashboard-01-chunk-0" className="">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">
                                Balance
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">EGP 231.89</div>
                        </CardContent>
                    </Card>
                </div>
                {/* CTA buttons */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card x-chunk="dashboard-01-chunk-0" className="">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">
                                Subscribe to a bus route
                            </CardTitle>
                            <BusIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="flex flex-col">
                            {/* description */}
                            <p className="text-sm text-muted-foreground">
                                Subscribe to a bus route to get daily updates
                                and notifications
                            </p>
                            <Button className="mt-4 w-fit self-end">
                                Subscribe
                            </Button>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-0" className="">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">
                                Reserve a trip
                            </CardTitle>
                            <Ticket className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="flex flex-col">
                            {/* description */}
                            <p className="text-sm text-muted-foreground">
                                Reserve a trip to get a seat on the bus
                            </p>
                            <Link
                                className="mt-4 w-fit self-end"
                                href="/reserve"
                            >
                                <Button>Reserve</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
                <Card className="my-4">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Trips History</CardTitle>
                            <CardDescription>
                                Recent trip history and details.
                            </CardDescription>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link href="#">
                                View All
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Trip</TableHead>
                                    <TableHead className="text-right">
                                        Amount
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">
                                            S1 - Haram (From)
                                        </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            4/25/2024
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        EGP 60.00
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">
                                            S1 - Haram (From)
                                        </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            4/25/2024
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        EGP 60.00
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">
                                            S1 - Haram (From)
                                        </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            4/25/2024
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        EGP 60.00
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">
                                            S5 - Nasr City (To)
                                        </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            4/25/2024
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        EGP 60.00
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">
                                            S1 - Haram (From)
                                        </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            4/25/2024
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        EGP 60.00
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </MaxWidthWrapper>
        </>
    );
}
