import type { Metadata } from 'next';
import MaxWidthWrapper from '@/components/custom/MaxWidthWrapper';

export const metadata: Metadata = {
    title: 'ZC Bus - Bus',
    description: '',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <MaxWidthWrapper className="my-4">{children}</MaxWidthWrapper>;
}
