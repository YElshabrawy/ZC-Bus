'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MaxWidthWrapper from './MaxWidthWrapper';
import ToggleTheme from './ToggleTheme';
import { getServerSession } from 'next-auth';
// import LoginBtn from './LoginBtn';
import { authOptions } from '@/lib/nextauth';
import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn';
import { useSession } from 'next-auth/react';
export default function Navbar() {
    // const session = await getServerSession(authOptions);
    const session = useSession();
    return (
        <nav className="w-full py-4 px-0 md:px-8 shadow-md bg-white dark:bg-background sticky top-0 z-50 dark:border-b">
            <MaxWidthWrapper className="flex justify-between items-center">
                <Link className="flex items-center" href="/">
                    <Image
                        src="/logo.png"
                        alt="ZC Bus"
                        width={40}
                        height={40}
                    />
                    {/* <h1 className="text-xl font-semibold">ZC Bus</h1> */}
                </Link>
                <div className="flex items-center space-x-4">
                    {/* <Link href="/login">
                        <Button>Login</Button>
                    </Link> */}
                    {!session.data?.user ? <LoginBtn /> : <LogoutBtn />}
                    <ToggleTheme />
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}
