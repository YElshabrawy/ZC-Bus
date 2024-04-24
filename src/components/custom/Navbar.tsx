'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MaxWidthWrapper from './MaxWidthWrapper';

export default function Navbar() {
    // const { setTheme } = useTheme();
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <nav className=" py-4 px-8 shadow-md dark:bg-gray-800">
            <MaxWidthWrapper className="flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-2xl font-bold">ZC Bus</h1>
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                    <Button
                        className="outline-none"
                        variant="outline"
                        size="icon"
                        onClick={toggleTheme}
                    >
                        {theme !== 'light' ? (
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        ) : (
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}
