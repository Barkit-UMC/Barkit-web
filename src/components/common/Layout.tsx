import type { ReactNode } from 'react';
import BottomNav from './BottomNav';

interface LayoutProps {
    children: ReactNode;
    header?: ReactNode;
    showBottomNav?: boolean;
}

export default function Layout({ children, header, showBottomNav = false }: LayoutProps) {
    return (
        <div className="app">
            {header && (
                <div className="app-header">
                    {header}
                </div>
            )}
            <main className="app-main scrollbar-hide">
                {children}
            </main>
            {showBottomNav && (
                <div className="app-bottom-nav">
                    <BottomNav />
                </div>
            )}
        </div>
    );
}
