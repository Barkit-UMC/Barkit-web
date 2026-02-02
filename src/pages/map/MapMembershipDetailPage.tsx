import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";

import MembershipCard from "../../components/membership/MembershipCard";
import cjoneIcon from '../../assets/icons/memberships/cjone.svg'

interface Membership {
    id: number;
    brandName: string;
    brandLogo: string;
    brandColor: string;
    barcode: string;
}

// 임시 데이터 (실제로는 API나 Props에서 가져옵니다)
const DUMMY_DATA: Membership[] = [
    {
        id: 1,
        brandName: 'CJ ONE',
        brandLogo: cjoneIcon,
        brandColor: '#1a1a2e',
        barcode: "1234 5678 9123 8284",
    },
];

export default function MapMembershipDetailPage() {
    const data = DUMMY_DATA; // 데이터 소스

    return (
        <Layout showBottomNav={true}>
            <div className="flex flex-col h-full bg-white overflow-y-auto">
                
               {/* 공통 Header 사용 */}
                <Header 
                    showBackButton={true}
                    title={data[0].brandName}
                />

                <div className="pt-20 overflow-y-auto scrollbar-hide">
                    {/* 1. 멤버십 카드 컴포넌트로 교체된 영역 */}
                    <div className="px-6">
                        <MembershipCard 
                            brandName={data[0].brandName}
                            brandLogo={data[0].brandLogo}
                            brandColor={data[0].brandColor}
                        />
                    </div>

                    <div className="px-6 mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">멤버십 번호</h3>
                        </div>
                        <div className="flex gap-2">
                            {data[0].barcode.split(' ').map((chunk, idx) => (
                                <div key={idx} className="flex-1 bg-gray-100 py-3 rounded-lg text-center font-semibold text-gray-600">
                                    {chunk}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}