'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { TBusRoute, TBusTicket } from '@/types/bus';
import { useEffect, useState } from 'react';

interface IProps {
    routes: TBusRoute[];
}
const TripsTable = ({ routes }: IProps) => {
    const [trips, setTrips] = useState<TBusTicket[]>([]);
    const axios = useAxiosAuth();
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get('/bus/bus-route/reserve');
                if (response.status === 200) {
                    setTrips(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchTrips();
    }, []);

    return (
        <Card className="my-4">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Trips History</CardTitle>
                    <CardDescription>
                        Recent trip history and details.
                    </CardDescription>
                </div>
                <Button disabled={true} size="sm" className="ml-auto gap-1">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {/* If no trips */}
                {trips.length === 0 ? (
                    <div className="text-muted-foreground text-center">
                        No trips found
                    </div>
                ) : (
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
                            {trips.map((trip) => {
                                const route = routes.find(
                                    (r) => r.id === trip.bus_route
                                );
                                return (
                                    <TableRow key={trip.id}>
                                        <TableCell>
                                            <div className="font-medium">
                                                {route?.code} -{' '}
                                                {route?.destination} (
                                                {trip.destination.split(' ')[0]}
                                                )
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {trip.created_at
                                                    .split('T')[0]
                                                    .replace(/-/g, '/')}
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            EGP 30.00
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};

export default TripsTable;
