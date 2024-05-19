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

export type TBusTicket = {
    id: number;
    created_at: string;
    modified_at: string;
    amount_paid: string;
    date: string;
    destination: string;
    user: number;
    bus_route: number;
    bus_offering: number;
};
