import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            access: string;
            refresh: string;
            user: {
                id: number;
                email: string;
                first_name: string;
                last_name: string;
                wallet_balance: string;
            };
        };
    }
}
