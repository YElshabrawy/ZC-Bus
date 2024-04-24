'use client';
import MaxWidthWrapper from '@/components/custom/MaxWidthWrapper';
import Image from 'next/image';

export default function Home() {
    return (
        <>
            <MaxWidthWrapper>
                <Image
                    src="/zc-main.jpg"
                    alt="Bus"
                    width={1920}
                    height={1080}
                    className="absolute inset-0 object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black opacity-50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white ">
                    <h1 className="text-2xl font-bold ">ZC Bus</h1>
                    <h1 className="text-2xl font-bold">ZC Bus - Home</h1>
                    <p className="text-lg">Welcome to ZC Bus</p>
                </div>
            </MaxWidthWrapper>
        </>
    );
}
