import { Link, useLocation } from 'react-router-dom';

import iconHomeOff from '../../assets/icons/bottom/home-off.svg';
import iconHomeOn from '../../assets/icons/bottom/home-on.svg';
import iconBarcodeOff from '../../assets/icons/bottom/barcode-off.svg';
// barcode-on 파일이 없어서 off를 같이 사용합니다. 파일이 있다면 파일명을 수정
import iconBarcodeOn from '../../assets/icons/bottom/barcode-off.svg';
import iconMapOff from '../../assets/icons/bottom/map-off.svg';
import iconMapOn from '../../assets/icons/bottom/map-on.svg';
import iconProfileOff from '../../assets/icons/bottom/profile-off.svg';
import iconProfileOn from '../../assets/icons/bottom/profile-on.svg';

/**
 * [PAGE 9] 하단 탭바 (홈/지도/전체)
 * 네비게이션 바 컴포넌트
 */
export default function BottomNav() {
    const location = useLocation();

    const navItems = [
        { path: '/wallet', label: '홈', iconOff: iconHomeOff, iconOn: iconHomeOn },
        { path: '/add', label: '추가', iconOff: iconBarcodeOff, iconOn: iconBarcodeOn },
        { path: '/map', label: '지도', iconOff: iconMapOff, iconOn: iconMapOn },
        { path: '/profile', label: '프로필', iconOff: iconProfileOff, iconOn: iconProfileOn }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        // 네비게이션 바 하단 fixed로 고정
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
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
