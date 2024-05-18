import { TBusRoute } from '@/types/bus';
import axiosInstance from '@/lib/axios';
import SubscribeForm from '@/components/custom/SubscribeForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth';
import { redirect } from 'next/navigation';

const fetchBusRoutes = async () => {
    try {
        const response = await axiosInstance.get('/bus/bus-routes/');
        if (response.status === 200) {
            console.log(response.data);
            return response.data as TBusRoute[];
        }
        return [];
    } catch (error) {
        console.error(error);
    }
};

export default async function Home() {
    const routes = (await fetchBusRoutes()) ?? [];
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/login');
    }

    return <SubscribeForm routes={routes} userID={session.user.user.id} />;
}
