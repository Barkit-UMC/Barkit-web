import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import MembershipTitle from '../../components/membership/MembershipTitle';
import searchIcon from '../../assets/icons/search/search_gray.svg'
import cjoneIcon from '../../assets/icons/memberships/cjone.svg'
import ktIcon from '../../assets/icons/memberships/kt.svg'
import sktIcon from '../../assets/icons/memberships/skt.svg'
import uplusIcon from '../../assets/icons/memberships/uplus.svg'
import ssgIcon from '../../assets/icons/memberships/ssg.svg'
import lpointIcon from '../../assets/icons/memberships/lpoint.svg'
import okcashbagIcon from '../../assets/icons/memberships/okcashbag.svg'
import happypointIcon from '../../assets/icons/memberships/happypoint.svg'
import naverIcon from '../../assets/icons/memberships/naver.svg'
import kakaopayIcon from '../../assets/icons/memberships/kakaopay.svg'
import FavoriteMembershipCard from '../../components/membership/FavoriteMembershipCard';
import emptyFavoriteImage from '../../assets/images/empty_favorite.svg';

interface FavoriteMembership {
    id: number;
    brandName: string;
    brandLogo: string;
    brandColor: string;
}

export default function WalletPage() {
    const navigate = useNavigate();

    // TODO: API에서 사용자의 멤버십 목록 가져오기
    // const favoriteMemberships: FavoriteMembership[] = []; // 멤버십 미추가된 상태

    const favoriteMemberships: FavoriteMembership[] = [
    {
        id: 1,
        brandName: 'CJ ONE',
        brandLogo: cjoneIcon,
        brandColor: '#1a1a2e',
    },
];

    const membershipList = [
        { id: 2, brandName: 'CJ ONE', brandLogo: cjoneIcon, brandColor: '#1a1a2e' },
        { id: 3, brandName: 'KT', brandLogo: ktIcon, brandColor: '#16423C' },
        { id: 4, brandName: 'SKT', brandLogo: sktIcon, brandColor: '#8B4513' },
        { id: 5, brandName: 'LG+', brandLogo: uplusIcon, brandColor: '#8B1538' },
        { id: 6, brandName: '신세계 SSG', brandLogo: ssgIcon, brandColor: '#2F5233' },
        { id: 7, brandName: 'L.POINT', brandLogo: lpointIcon, brandColor: '#4A5568' },
        { id: 8, brandName: 'OK 캐쉬백', brandLogo: okcashbagIcon, brandColor: '#8B1538' },
        { id: 9, brandName: '해피포인트', brandLogo: happypointIcon, brandColor: '#1e3a8a' },
        { id: 10, brandName: '네이버', brandLogo: naverIcon, brandColor: '#059669' },
        { id: 11, brandName: '카카오페이', brandLogo: kakaopayIcon, brandColor: '#854d0e' },
    ];

    return (
        <Layout showBottomNav>
            {/* 1. 전체 컨테이너: app-main 내부에서 스크롤이 가능하도록 설정 */}
            <div className="flex flex-col flex-1 bg-gray-50 overflow-y-auto scrollbar-hide pb-20">
                
                {/* 2. 섹션별 컨테이너: max-width를 주어 태블릿/PC에서도 적절한 너비 유지 */}
                <div className="w-full max-w-[430px] mx-auto">
                    
                    {/* 대표 멤버십 섹션 */}
                    <section className="px-6 pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">대표 멤버십</h2>
                        </div>

                        <div className="relative">
                            {favoriteMemberships.length > 0 ? (
                                <FavoriteMembershipCard
                                    brandName={favoriteMemberships[0].brandName}
                                    brandLogo={favoriteMemberships[0].brandLogo}
                                    brandColor={favoriteMemberships[0].brandColor}
                                    onClick={() => navigate(`/membership/${favoriteMemberships[0].id}`)}
                                />
                            ) : (
                                <div className="w-full h-[208px] bg-gray-200 rounded-[10px] flex items-center justify-center overflow-hidden">
                                    <img 
                                        src={emptyFavoriteImage} 
                                        alt="대표 멤버십 미설정" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* 페이지 인디케이터 */}
                        <div className="flex justify-center gap-2 mt-4">
                            {[...Array(3)].map((_, index) => (
                                <div 
                                    key={index}
                                    className={`w-1.5 h-1.5 rounded-full transition-colors ${index === 0 ? 'bg-cyan-400' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </section>

                    <div className="h-8" /> {/* 섹션 간 간격 */}

                    {/* 멤버십 리스트 섹션 */}
                    <section className="px-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">멤버십 리스트</h2>
                            <button 
                                onClick={() => navigate('/search')}
                                className="p-1 active:scale-90 transition-transform"
                            >
                                <img src={searchIcon} alt="검색" className="w-6 h-6" />
                            </button>
                        </div>

                        {membershipList.length > 0 ? (
                            /* 그리드 시스템: 모바일에선 2열 고정 */
                            <div className="grid grid-cols-2 gap-x-3 gap-y-4 w-full justify-items-stretch">
                                {membershipList.map((membership) => (
                                        <MembershipTitle
                                            brandName={membership.brandName}
                                            brandLogo={membership.brandLogo}
                                            brandColor={membership.brandColor}
                                            onClick={() => navigate(`/membership/${membership.id}`)}
                                        />
                                ))}
                            </div>
                        ) : (
                            /* 빈 상태 레이아웃 */
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <span className="text-5xl mb-4">📱</span>
                                <h3 className="text-lg font-semibold text-gray-900">등록된 멤버십이 없습니다</h3>
                                <p className="text-gray-500 text-sm mb-6">첫 멤버십을 등록해보세요</p>
                                <button
                                    onClick={() => navigate('/membership/select')}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium active:scale-95 transition-all shadow-md"
                                >
                                    멤버십 등록하기
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </Layout>
    );
}