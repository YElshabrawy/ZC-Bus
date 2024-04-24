// Simple login page that does not do anything but it looks good and is responsive.

import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <Link href="/">
                <p className="text-blue-500">Return to Home</p>
            </Link>
        </div>
    );
}
