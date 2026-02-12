import { Link, useLocation } from 'react-router-dom';

import iconBarcodeOff from '../../assets/icons/bottom/barcode-off.svg';
import iconBarcodeOn from '../../assets/icons/bottom/barcode-on.svg';
import iconMapOff from '../../assets/icons/bottom/map-off.svg';
import iconMapOn from '../../assets/icons/bottom/map-on.svg';
import iconProfileOff from '../../assets/icons/bottom/profile-off.svg';
import iconProfileOn from '../../assets/icons/bottom/profile-on.svg';
import iconAddOff from '../../assets/icons/bottom/add-off.svg';
import iconAddOn from '../../assets/icons/bottom/add-on.svg';

/**
 * [PAGE 9] 하단 탭바 (홈/지도/전체)
 * 네비게이션 바 컴포넌트
 */
export default function BottomNav() {
    const location = useLocation();

    const navItems = [
        { path: '/home', label: '홈', iconOff: iconBarcodeOff, iconOn: iconBarcodeOn },
        { path: '/membership/add', label: '추가', iconOff: iconAddOff, iconOn: iconAddOn },
        { path: '/map', label: '지도', iconOff: iconMapOff, iconOn: iconMapOn },
        { path: '/profile', label: '마이', iconOff: iconProfileOff, iconOn: iconProfileOn }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-white border-t border-gray-200">
            <div className="flex justify-around items-center h-16 w-full">
                {navItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${active ? 'text-black font-extrabold' : 'text-gray-500'
                                }`}
                        >
                            <div className="w-6 h-6 mb-1">
                                <img
                                    src={active ? item.iconOn : item.iconOff}
                                    alt={item.label}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
