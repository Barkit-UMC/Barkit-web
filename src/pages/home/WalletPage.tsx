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
            <div className="min-h-screen bg-gray-50">
                {/* 대표 멤버십 섹션 */}
                <div className="px-6 py-6">
                    <div className="flex items-center justify-between mt-4 mb-4">
                        <p className="text-xl font-semibold">대표 멤버십</p>
                    </div>

                    {favoriteMemberships.length > 0 ? (
                        <FavoriteMembershipCard
                            brandName={favoriteMemberships[0].brandName}
                            brandLogo={favoriteMemberships[0].brandLogo}
                            brandColor={favoriteMemberships[0].brandColor}
                            onClick={() => navigate(`/membership/${favoriteMemberships[0].id}`)}
                        />
                    ) : (
                        <img 
                            src={emptyFavoriteImage} 
                            alt="대표 멤버십 미설정" 
                            className="w-full object-contain rounded-[10px]"
                            style={{ width: '345px', height: '208px' }}
                        />
                    )}

                    {/* 페이지 인디케이터 */}
                    <div className="flex justify-center gap-2 mt-4">
                        {[...Array(3)].map((_, index) => (
                            <div 
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-[#00C0E8]' : 'bg-gray-200'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* 멤버십 리스트 섹션 */}
                <div className="px-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xl font-semibold">멤버십 리스트</p>
                        <button onClick={() => navigate('/search')}>
                            <img 
                                src={searchIcon} 
                                alt="검색" 
                                className="w-6 h-6"
                            />
                        </button>
                    </div>

                    {membershipList.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {membershipList.map((membership) => (
                                <MembershipTitle
                                    key={membership.id}
                                    brandName={membership.brandName}
                                    brandLogo={membership.brandLogo}
                                    brandColor={membership.brandColor}
                                    onClick={() => navigate(`/membership/${membership.id}`)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📱</div>
                            <h2 className="text-xl font-semibold mb-2 text-gray-900">
                                등록된 멤버십이 없습니다
                            </h2>
                            <p className="text-gray-600 mb-6">
                                첫 멤버십을 등록해보세요
                            </p>
                            <button
                                onClick={() => navigate('/membership/select')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                멤버십 등록하기
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}