'use client';
import { Session } from 'next-auth';
import React from 'react';
import { Button } from '../ui/button';
import { signIn, signOut } from 'next-auth/react';

function LoginBtn({ session }: { session: Session | null }) {
    'use client';
    if (session && session.user) {
        return <Button onClick={() => signOut()}>Sign out</Button>;
    }
    return <Button onClick={() => signIn()}>Log in</Button>;
}

export default LoginBtn;
