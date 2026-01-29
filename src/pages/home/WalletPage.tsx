import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import MembershipCard from '../../components/membership/MembershipCard';
import MembershipTitle from '../../components/membership/MembershipTitle';
import search from '../../assets/icons/search.svg'
import CjoneIcon from '../../assets/icons/memberships/cjone.svg'
import KtIcon from '../../assets/icons/memberships/kt.svg'
import SktIcon from '../../assets/icons/memberships/skt.svg'
import UplusIcon from '../../assets/icons/memberships/uplus.svg'
import SsgIcon from '../../assets/icons/memberships/ssg.svg'
import LpointIcon from '../../assets/icons/memberships/lpoint.svg'
import OkcashbagIcon from '../../assets/icons/memberships/okcashbag.svg'
import HappypointIcon from '../../assets/icons/memberships/happypoint.svg'
import NaverIcon from '../../assets/icons/memberships/naver.svg'
import KakaopayIcon from '../../assets/icons/memberships/kakaopay.svg'

export default function WalletPage() {
    const navigate = useNavigate();

    // TODO: API에서 사용자의 멤버십 목록 가져오기
    const featuredMembership = {
        id: 1,
        brandName: 'CJ ONE',
        brandLogo: CjoneIcon,
        brandColor: '#1a1a2e',
        barcodeNumber: '1234567890123456',
    };

    const membershipList = [
        { id: 2, brandName: 'CJ ONE', brandLogo: CjoneIcon, brandColor: '#1a1a2e' },
        { id: 3, brandName: 'KT', brandLogo: KtIcon, brandColor: '#16423C' },
        { id: 4, brandName: 'SKT', brandLogo: SktIcon, brandColor: '#8B4513' },
        { id: 5, brandName: 'LG+', brandLogo: UplusIcon, brandColor: '#8B1538' },
        { id: 6, brandName: '신세계 SSG', brandLogo: SsgIcon, brandColor: '#2F5233' },
        { id: 7, brandName: 'L.POINT', brandLogo: LpointIcon, brandColor: '#4A5568' },
        { id: 8, brandName: 'OK 캐쉬백', brandLogo: OkcashbagIcon, brandColor: '#8B1538' },
        { id: 9, brandName: '해피포인트', brandLogo: HappypointIcon, brandColor: '#1e3a8a' },
        { id: 10, brandName: '네이버', brandLogo: NaverIcon, brandColor: '#059669' },
        { id: 11, brandName: '카카오페이', brandLogo: KakaopayIcon, brandColor: '#854d0e' },
    ];

    return (
        <Layout showBottomNav>
            <div className="min-h-screen bg-gray-50">
                {/* 대표 멤버십 섹션 */}
                <div className="px-6 py-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xl font-semibold">대표 멤버십</p>
                    </div>

                    <MembershipCard
                        brandName={featuredMembership.brandName}
                        brandLogo={featuredMembership.brandLogo}
                        brandColor={featuredMembership.brandColor}
                        barcodeNumber={featuredMembership.barcodeNumber}
                        onClick={() => navigate(`/wallet/${featuredMembership.id}`)}
                    />
                    
                    {/* 페이지 인디케이터 */}
                    <div className="flex justify-center gap-2 mt-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                    </div>
                </div>

                {/* 멤버십 리스트 섹션 */}
                <div className="px-6 pb-24">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xl font-semibold">멤버십 리스트</p>
                        <button className="">
                            <img 
                                src={search} 
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
                                    onClick={() => navigate(`/wallet/${membership.id}`)}
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