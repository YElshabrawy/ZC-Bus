import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const HomeHeader = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    return (
        <>
            <h1 className="text-3xl font-semibold mb-4">
                Hello,{' '}
                <span className="text-primary">
                    {session?.user.user.first_name +
                        ' ' +
                        session?.user.user.last_name || 'Unknown'}
                </span>{' '}
                🎉
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
                        <div className="text-2xl font-bold">
                            EGP {session?.user.user.wallet_balance || 'N/A'}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default HomeHeader;
