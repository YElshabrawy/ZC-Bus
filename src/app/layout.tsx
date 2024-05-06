import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Container } from 'postcss';
import MaxWidthWrapper from '@/components/custom/MaxWidthWrapper';
import Navbar from '@/components/custom/Navbar';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/components/custom/Providers';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/custom/SessionProvider';
import { authOptions } from './api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: 'ZC Bus',
    description: '',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body
                className={cn(
                    inter.variable,
                    'relative h-full font-sans antialiased'
                )}
            >
                <SessionProvider session={session}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <main className="relative flex flex-col min-h-screen">
                            <Navbar />
                            <div className="flex-grow flex-1">{children}</div>
                        </main>
                        <Toaster />
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
