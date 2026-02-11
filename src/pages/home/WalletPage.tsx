import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import MembershipTitle from '../../components/membership/MembershipTitle';
import FavoriteMembershipCard from '../../components/membership/FavoriteMembershipCard';
import searchIcon from '../../assets/icons/search/search_gray.svg';
import emptyFavoriteImage from '../../assets/images/empty_favorite.svg';
import { dashboardApi } from '../../api/dashboard';
import type { MainMembership, MembershipSummary } from '../../api/dashboard';

// 브랜드 ID → 로컬 아이콘/컬러 매핑 (logoUrl이 없거나 로딩 실패 시 fallback)
import cjoneIcon from '../../assets/icons/memberships/cjone.svg';
import ktIcon from '../../assets/icons/memberships/kt.svg';
import sktIcon from '../../assets/icons/memberships/skt.svg';
import uplusIcon from '../../assets/icons/memberships/uplus.svg';
import ssgIcon from '../../assets/icons/memberships/ssg.svg';
import lpointIcon from '../../assets/icons/memberships/lpoint.svg';
import okcashbagIcon from '../../assets/icons/memberships/okcashbag.svg';
import happypointIcon from '../../assets/icons/memberships/happypoint.svg';
import naverIcon from '../../assets/icons/memberships/naver.svg';
import kakaopayIcon from '../../assets/icons/memberships/kakaopay.svg';

const BRAND_META: Record<number, { icon: string; color: string }> = {
    1: { icon: cjoneIcon, color: '#1E192A' },
    2: { icon: happypointIcon, color: '#0D0F71' },
    3: { icon: ktIcon, color: '#2CBBB6' },
    4: { icon: lpointIcon, color: '#009BFA' },
    5: { icon: sktIcon, color: '#3617CE' },
    6: { icon: uplusIcon, color: '#FF2E98' },
    7: { icon: ssgIcon, color: '#902CDF' },
    8: { icon: okcashbagIcon, color: '#FE0955' },
    9: { icon: naverIcon, color: '#1A033B' },
    10: { icon: kakaopayIcon, color: '#FFEB00' },
};

const getBrandIcon = (brandId: number, logoUrl?: string) =>
    logoUrl || BRAND_META[brandId]?.icon || '';

const getBrandColor = (brandId: number) =>
    BRAND_META[brandId]?.color || '#888888';

export default function WalletPage() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // 실제 API 데이터
    const [mainMemberships, setMainMemberships] = useState<MainMembership[]>([]);
    const [memberships, setMemberships] = useState<MembershipSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 대시보드 API 호출
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await dashboardApi.getDashboard();
                if (response.isSuccess && response.result) {
                    setMainMemberships(response.result.mainMemberships || []);
                    setMemberships(response.result.memberships || []);
                }
            } catch (err) {
                console.error('Dashboard fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    // 스와이프 최소 거리
    const minSwipeDistance = 50;

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(0);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && currentSlide < mainMemberships.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }

        if (isRightSwipe && currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    if (isLoading) {
        return (
            <Layout showBottomNav>
                <div className="flex items-center justify-center h-screen">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-cyan-400 rounded-full animate-spin" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout showBottomNav>
            {/* 1. 전체 컨테이너 */}
            <div className="flex flex-col flex-1 bg-gray-50 overflow-y-auto scrollbar-hide pb-20">

                {/* 2. 섹션별 컨테이너 */}
                <div className="w-full max-w-[430px] mx-auto">

                    {/* 대표 멤버십 섹션 */}
                    <section className="px-6 pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">대표 멤버십</h2>
                        </div>

                        <div className="relative overflow-hidden">
                            {mainMemberships.length > 0 ? (
                                <div
                                    className="flex transition-transform duration-300 ease-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    {mainMemberships.map((membership) => (
                                        <div key={membership.userMembershipBrandId} className="w-full flex-shrink-0">
                                            <FavoriteMembershipCard
                                                brandName={membership.name}
                                                brandLogo={getBrandIcon(membership.membershipBrandId, membership.logoUrl)}
                                                brandColor={getBrandColor(membership.membershipBrandId)}
                                                onClick={() => navigate(`/membership/${membership.userMembershipBrandId}`)}
                                            />
                                        </div>
                                    ))}
                                </div>
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
                        {mainMemberships.length > 1 && (
                            <div className="flex justify-center gap-2 mt-4">
                                {mainMemberships.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-1.5 h-1.5 rounded-full transition-colors ${index === currentSlide ? 'bg-cyan-400' : 'bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
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

                        {memberships.length > 0 ? (
                            /* 그리드 시스템 */
                            <div className="grid grid-cols-2 gap-x-3 gap-y-4 w-full justify-items-stretch">
                                {memberships.map((membership) => (
                                    <MembershipTitle
                                        key={membership.userMembershipBrandId}
                                        brandName={membership.name}
                                        brandLogo={getBrandIcon(membership.membershipBrandId, membership.logoUrl)}
                                        brandColor={getBrandColor(membership.membershipBrandId)}
                                        onClick={() => navigate(`/membership/${membership.userMembershipBrandId}`)}
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
                                    onClick={() => navigate('/onboarding/search')}
                                    className="px-8 py-3 bg-[#00BCD4] text-white rounded-xl font-medium active:scale-95 transition-all shadow-md"
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