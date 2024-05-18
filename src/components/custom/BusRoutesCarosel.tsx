'use client';
import { type CarouselApi } from '@/components/ui/carousel';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { TBusRoute } from '@/types/bus';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Car, Clock, Map, StopCircle, BusFront } from 'lucide-react';

export function BusRoutesCarosel({ busRoutes }: { busRoutes: TBusRoute[] }) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <>
            <section className="w-full py-4">
                <div className="mx-auto lg:max-w-6xl px-3">
                    <Carousel
                        opts={{
                            loop: true,
                            align: 'start',
                        }}
                    >
                        <CarouselContent>
                            {busRoutes.map((route, index) => (
                                <CarouselItem
                                    key={index}
                                    className="lg:basis-1/2"
                                >
                                    <Card className="shadow-md rounded-md ">
                                        {' '}
                                        {/* Added background color */}
                                        <CardHeader className="bg-primary rounded-t-md text-white mb-3">
                                            {' '}
                                            {/* Added background color and text color */}
                                            <h2 className="text-xl font-semibold">
                                                {route.destination} (
                                                {route.code})
                                                <BusFront
                                                    className="inline ml-2"
                                                    size={20}
                                                />
                                            </h2>
                                        </CardHeader>
                                        <CardContent>
                                            <p>
                                                <strong>Driver:</strong>{' '}
                                                {route.driver}
                                            </p>
                                            <p>
                                                <strong>Capacity:</strong>{' '}
                                                {route.capacity}
                                            </p>
                                            <p>
                                                <strong>Plate Number:</strong>{' '}
                                                {route.plate_number}
                                            </p>
                                            <h3 className="text-lg font-semibold mt-4 mb-2">
                                                Bus Stops
                                                {/* Added Stop icon */}
                                            </h3>
                                            <Accordion
                                                type="single"
                                                collapsible
                                            >
                                                {route.bus_stops.map(
                                                    (stop, index) => (
                                                        <AccordionItem
                                                            key={index}
                                                            value={`item-${
                                                                index + 1
                                                            }`}
                                                        >
                                                            <AccordionTrigger>
                                                                <h4 className="font-semibold">
                                                                    {stop.name}{' '}
                                                                    <Clock
                                                                        className="inline ml-2"
                                                                        size={
                                                                            20
                                                                        }
                                                                    />{' '}
                                                                    {/* Added Clock icon */}
                                                                </h4>
                                                            </AccordionTrigger>
                                                            <AccordionContent>
                                                                <p>
                                                                    <strong>
                                                                        Address:
                                                                    </strong>{' '}
                                                                    {
                                                                        stop.address
                                                                    }
                                                                </p>
                                                                <p>
                                                                    <strong>
                                                                        Map
                                                                        Location:
                                                                    </strong>{' '}
                                                                    <a
                                                                        href={`https://www.google.com/maps?q=${stop.map_location.replace(
                                                                            ' ',
                                                                            ''
                                                                        )}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-500"
                                                                    >
                                                                        <Map
                                                                            className="inline ml-2"
                                                                            size={
                                                                                20
                                                                            }
                                                                        />{' '}
                                                                        View Map{' '}
                                                                        {/* Added Map icon */}
                                                                    </a>
                                                                </p>
                                                                <p>
                                                                    <strong>
                                                                        Departure
                                                                        Time:
                                                                    </strong>{' '}
                                                                    {
                                                                        stop.departure_time
                                                                    }
                                                                </p>
                                                                <p>
                                                                    <strong>
                                                                        Arrival
                                                                        Time:
                                                                    </strong>{' '}
                                                                    {
                                                                        stop.arrival_time
                                                                    }
                                                                </p>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    )
                                                )}
                                            </Accordion>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden sm:flex absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
                        <CarouselNext className="hidden sm:flex absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
                    </Carousel>
                </div>
            </section>
        </>
    );
}
