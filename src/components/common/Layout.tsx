import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    showBottomNav?: boolean;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <main className="h-screen overflow-y-auto scrollbar-hide bg-white">
            {children}
        </main>
    );
}
