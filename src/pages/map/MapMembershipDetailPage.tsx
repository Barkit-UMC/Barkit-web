import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";

import MembershipCard from "../../components/membership/MembershipCard";
import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { membershipApi, type UserMembershipDetail } from "../../api/membership";
import { dashboardApi } from "../../api/dashboard";

// 멤버십 번호를 4자리씩 끊어서 표시
const formatMembershipNumber = (number: string): string[] => {
    const digits = number.replace(/[\s-]/g, '');
    const chunks: string[] = [];
    for (let i = 0; i < digits.length; i += 4) {
        chunks.push(digits.substring(i, i + 4));
    }
    return chunks.length > 0 ? chunks : ['----'];
};

export default function MapMembershipDetailPage() {
    const { userMembershipId } = useParams<{ userMembershipId: string }>();
    const [detail, setDetail] = useState<UserMembershipDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 멤버십 상세 API
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const [detailRes] = await Promise.all([
                    membershipApi.getUserMembershipDetail(Number(userMembershipId)),
                    dashboardApi.getDashboard(),
                ]);

                if (detailRes.isSuccess && detailRes.result) {
                    setDetail(detailRes.result);
                }
            } catch (err) {
                console.error('Membership detail fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetail();
    }, [userMembershipId]);

    if (isLoading) {
        return (
            <Layout showBottomNav>
                <div className="flex items-center justify-center h-screen">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-cyan-400 rounded-full animate-spin" />
                </div>
            </Layout>
        );
    }

    if (!detail) {
        return (
            <Layout showBottomNav>
                <Header showBackButton title="멤버십 상세" />
                <div className="flex items-center justify-center h-screen">
                    <p className="text-gray-500">멤버십을 찾을 수 없습니다.</p>
                </div>
            </Layout>
        );
    }

    const numberChunks = formatMembershipNumber(detail.membershipNumber);

    return (
        <Layout>
            <div className="flex flex-col h-full bg-gray-50 overflow-y-auto scrollbar-hide">

                {/* 공통 Header 사용 */}
                <Header
                    showBackButton={true}
                    title={detail.membershipBrandName}
                />

                <div className="pt-20 overflow-y-auto scrollbar-hide">
                    {/* 1. 멤버십 카드 (실제 바코드 포함) */}
                    <div className="px-6">
                        <MembershipCard
                            brandName={detail.membershipBrandName}
                            brandLogo={detail.logoUrl}
                            brandColor={detail.themeColor}
                            membershipNumber={detail.membershipNumber}
                        />
                    </div>

                    {/* 2. 멤버십 번호 */}
                    <div className="px-6 mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">멤버십 번호</h3>
                        </div>
                        <div className="flex gap-2 w-full h-28 bg-white rounded-xl px-4 items-center">
                            {numberChunks.map((chunk, idx) => (
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