import MaxWidthWrapper from '@/components/custom/MaxWidthWrapper';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MaxWidthWrapper className="my-8">
            <h1 className="text-3xl font-semibold mb-4">
                Hello, <span className="text-primary">Youssef</span> 🎉
            </h1>
            {children}
        </MaxWidthWrapper>
    );
}
