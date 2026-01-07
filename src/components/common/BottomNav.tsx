import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * [PAGE 9] 하단 탭바 (홈/지도/전체)
 * 네비게이션 바 컴포넌트
 */
export default function BottomNav() {
    const location = useLocation();

    const navItems = [
        { path: '/wallet', label: '홈', icon: 'home' },
        { path: '/map', label: '지도', icon: 'map' },
        { path: '/my', label: '마이페이지', icon: 'user' }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
            <div className="flex justify-around items-center h-16 max-w-[393px] mx-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'
                            }`}
                    >
                        <div className="w-6 h-6 mb-1">
                            {item.icon === 'home' && (
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            )}
                            {item.icon === 'map' && (
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            )}
                            {item.icon === 'user' && (
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            )}
                        </div>
                        <span className="text-xs">{item.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
