import { TBusRoute } from '@/types/bus';
import axiosInstance from '@/lib/axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import ReserveForm from '@/components/custom/ReserveForm';

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

    return (
        <ReserveForm
            routes={routes}
            wallet_balance={session.user.user.wallet_balance}
        />
    );
}
