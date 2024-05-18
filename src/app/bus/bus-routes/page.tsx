import { Card, CardContent, CardHeader } from '@/components/ui/card';
import axios from '@/lib/axios';
import { TBusRoute } from '@/types/bus';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { BusRoutesCarosel } from '@/components/custom/BusRoutesCarosel';

const fetchBusRoutes = async () => {
    try {
        const response = await axios.get('/bus/bus-routes/');
        if (response.status === 200) {
            console.log(response.data);
            return response.data as TBusRoute[];
        }
        return [];
    } catch (error) {
        console.error(error);
    }
};

export const revalidate = 60;
const BusRoutes = async () => {
    const busRoutes = (await fetchBusRoutes()) ?? [];
    return (
        <div className="w-full">
            <h1 className="text-3xl font-semibold">Bus Routes 🚉</h1>
            <p className="text-sm text-muted-foreground">
                Explore all available bus routes and their stops
            </p>
            <BusRoutesCarosel busRoutes={busRoutes} />
        </div>
    );
};

export default BusRoutes;
