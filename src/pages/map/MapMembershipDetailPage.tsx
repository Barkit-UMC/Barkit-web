import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";

import MembershipCard from "../../components/membership/MembershipCard";
import cjoneIcon from '../../assets/icons/memberships/cjone.svg'
import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { mapApi, type MapMembershipResponse } from "../../api/map";


export default function MapMembershipDetailPage() {
    const { userMembershipId } = useParams<{ userMembershipId: string }>();
    const [membershipData, setMembershipData] = useState<MapMembershipResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembership = async () => {
            if (!userMembershipId) return;
            
            try {
                setLoading(true);
                const data = await mapApi.getMembershipDetail(userMembershipId);

                if (data.isSuccess) {
                    setMembershipData(data.result);
                }
            } catch (error) {
                console.error("멤버십 조회 실패:", error);
                // 필요 시 에러 처리 (예: navigate(-1))
            } finally {
                setLoading(false);
            }
        };

        fetchMembership();
    }, [userMembershipId]);

    // 로딩 중이거나 데이터가 없을 때 처리
    if (loading) return <Layout><div className="pt-20 text-center">로딩 중...</div></Layout>;
    if (!membershipData) return <Layout><div className="pt-20 text-center">정보를 찾을 수 없습니다.</div></Layout>;

    return (
        <Layout showBottomNav={true}>
            <div className="flex flex-col h-full bg-white overflow-y-auto">
                
               {/* 공통 Header 사용 */}
                <Header 
                    showBackButton={true}
                    title={membershipData.membershipBrandName}
                />

                <div className="pt-20 overflow-y-auto scrollbar-hide">
                    {/* 1. 멤버십 카드 컴포넌트로 교체된 영역 */}
                    <div className="px-6">
                        <MembershipCard 
                            brandName={membershipData.membershipBrandName}
                            brandLogo={membershipData.logoUrl}
                            brandColor={membershipData.themeColor}
                        />
                    </div>

                    <div className="px-6 mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">멤버십 번호</h3>
                        </div>
                        <div className="flex gap-2">
                        {/* 4자리씩 끊어서 배열로 반환, 없으면 빈 배열 */}
                        {(membershipData.membershipNumber.match(/.{1,4}/g) || []).map((chunk, idx) => (
                            <div 
                            key={idx} 
                            className="flex-1 bg-gray-100 py-3 rounded-lg text-center font-semibold text-gray-600"
                            >
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