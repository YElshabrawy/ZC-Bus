'use client';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

function LogoutBtn() {
    // if (session && session.user) {
    //     return <Button onClick={() => signOut()}>Sign out</Button>;
    // }
    return <Button onClick={() => signOut()}>Sign out</Button>;
}

export default LogoutBtn;
