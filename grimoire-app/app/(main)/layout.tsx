import React from 'react'

import { getServerSession } from '@/lib/getServerSession';
import { redirect } from 'next/navigation';
import SessionProvider from './SessionProvider';
import Navbar from '@/components/Navbar';

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();
    if (!session?.user) redirect("/auth");

    return (
        <SessionProvider value={session}>
            <div className="flex min-h-screen flex-col">
                <Navbar className='sticky top-0 z-10 bg-card' />
                <div className="w-full max-w-5xl mx-auto flex py-2 sm:p-5 grow gap-5 pb-16 sm:pb-0">
                    {children}
                </div>
            </div>
        </SessionProvider>
    );
}