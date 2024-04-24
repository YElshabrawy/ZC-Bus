import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Link href="/login">
                <Button>Go to Login</Button>
            </Link>
        </div>
    );
}
