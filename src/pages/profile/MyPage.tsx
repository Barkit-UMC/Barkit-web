import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import BottomNav from '../../components/common/BottomNav';

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
        { label: '내 정보 수정', path: '/my/edit', icon: '👤' },
        { label: '즐겨찾는 매장', path: '/favorites', icon: '⭐' },
        { label: '알림 설정', path: '/my/notifications', icon: '🔔' },
        { label: '고객센터', path: '/my/support', icon: '💬' },
    ];

    const handleLogout = () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            // TODO: 로그아웃 처리
            navigate('/login');
        }
    };

    return (
        <Layout showBottomNav>
            <div className="p-6 pb-20">
                <h1 className="text-2xl font-bold mb-6">마이페이지</h1>

                {/* 프로필 카드 */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                            👤
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="text-blue-100 text-sm">{user.email}</p>
                        </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                        <p className="text-sm text-blue-100">등록된 멤버십</p>
                        <p className="text-2xl font-bold">{user.membershipCount}개</p>
                    </div>
                </div>

                {/* 메뉴 리스트 */}
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className="w-full p-4 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:border-blue-500 hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ))}
                </div>

                {/* 로그아웃 버튼 */}
                <button
                    onClick={handleLogout}
                    className="w-full mt-6 p-4 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                    로그아웃
                </button>
            </div>
            <BottomNav />
        </Layout>
    );
}
