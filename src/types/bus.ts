export type TBusStop = {
    id: number;
    name: string;
    address: string;
    map_location: string;
    departure_time: string;
    arrival_time: string;
    bus_route: number;
};

export type TBusRoute = {
    id: number;
    destination: string;
    code: string;
    driver: number;
    capacity: number;
    plate_number: string;
    bus_stops: TBusStop[];
};
