import HomeHeader from '@/components/custom/HomeHeader';
import MaxWidthWrapper from '@/components/custom/MaxWidthWrapper';
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
import { authOptions } from '@/lib/nextauth';
import {
    CalendarSearch,
    BusIcon,
    Ticket,
    ArrowUpRight,
    Bus,
} from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const SubscribeButton = () => {
    return (
        <Card x-chunk="dashboard-01-chunk-0" className="my-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                    Show All Bus Routes
                </CardTitle>
                <CalendarSearch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col">
                {/* description */}
                <p className="text-sm text-muted-foreground">
                    Explore all available bus routes
                </p>
                <Link className="mt-4 w-fit self-end" href="/bus/bus-routes">
                    <Button>Discover</Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <MaxWidthWrapper className="mt-8">
                <h1 className="text-2xl font-semibold">Welcome to ZC Bus</h1>
                <p className="text-sm text-muted-foreground">
                    Please sign in to continue
                </p>
                <SubscribeButton />
                {/* Animated bus from right to left repeatedly and a button to login */}
                <div className="flex flex-col items-center justify-center mt-8">
                    <div className="overflow-hidden w-full">
                        <div className="flex animate-bus-move">
                            <span className="text-primary">
                                Login for more...
                            </span>
                            <BusIcon className="text-primary" />
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        );
    }
    return (
        <>
            <MaxWidthWrapper className="mt-8">
                <HomeHeader />
                {/* CTA buttons */}
                <Card x-chunk="dashboard-01-chunk-0" className="my-4">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">
                            Show All Bus Routes
                        </CardTitle>
                        <CalendarSearch className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="flex flex-col">
                        {/* description */}
                        <p className="text-sm text-muted-foreground">
                            Explore all available bus routes
                        </p>
                        <Link
                            className="mt-4 w-fit self-end"
                            href="/bus/bus-routes"
                        >
                            <Button>Discover</Button>
                        </Link>
                    </CardContent>
                </Card>
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
                            <Link
                                className="mt-4 w-fit self-end"
                                href="/subscribe"
                            >
                                <Button>Subscribe</Button>
                            </Link>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-1" className="">
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
