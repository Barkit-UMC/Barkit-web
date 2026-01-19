import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';

/**
 * [PAGE 20] 마이페이지 메인
 */
export default function MyPage() {
    const navigate = useNavigate();

    // TODO: API에서 사용자 정보 가져오기
    const user = {
        name: '홍길동',
        email: 'hong@example.com',
        membershipCount: 3
    };

    const menuItems = [
        { id: 'pwa', label: '홈 화면에 추가 (PWA)', path: '/profile/pwa' },
        { id: 'edit', label: '개인정보 변경', path: '/profile/edit' },
        { id: 'locationpermission', label: '위치 권한 요청', path: '/profile/locationpermission'},
        { id: 'notification', label: '알림 설정', isOn: false},
        { id: 'logout', label: '로그아웃', path: '/profile/logout' },
        { id: 'unsubscribe', label: '회원탈퇴', path: '/profile/unscribe' }
    ];

    const [isNotiOn, setIsNotiOn] = useState(false);
    return (
        <Layout showBottomNav>
                <div className="w-full h-[128px] flex justify-center place-items-end border-b border-gray-200">
                    <h1 className="text-[20px] font-semibold pb-4">프로필</h1>
                </div>
                

                {/* 메뉴 리스트 */}
                <div className="mt-4">
                    {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            if (item.path) {
                                navigate(item.path);
                            }}
                        }
                        className={`
                            w-full h-18
                            bg-white
                            flex items-center justify-between
                            px-[25px]
                            ${item.label !== '알림 설정' ? 'hover:cursor-pointer' : ''}
                        `}
                        >
                        {/* 왼쪽 텍스트 */}
                        <span className="text-[20px] font-semibold">
                            {item.label}
                        </span>

                        {/* 오른쪽 알림 아이콘 */}
                        {item.label === '알림 설정' && (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsNotiOn(prev => !prev);
                                }}
                            className={`
                                w-[46px] h-[26px] rounded-full
                                cursor-pointer transition-colors duration-300
                                ${isNotiOn ? 'bg-green-500' : 'bg-gray-300'}
                                relative
                            `}>
                            <div
                                className={`
                                    absolute top-1/2 -translate-y-1/2
                                    w-[20px] h-[20px] bg-white rounded-full shadow-sm
                                    transform transition-transform duration-300
                                    ${isNotiOn ? 'translate-x-[22px]' : 'translate-x-[4px]'}
                                `}
                            />
                            </div>
                        )}
                    </button>
                    ))}
                </div>
        </Layout>
    );
}
