import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";
import iconSetting from '../../assets/icons/memberships/iconSetting.svg';
import iconEdit from '../../assets/icons/memberships/iconEdit.svg';
import iconPlus from '../../assets/icons/memberships/iconPlus.svg';
import MembershipCard from "../../components/membership/MembershipCard";
import { useEffect, useState } from "react";
import MembershipSettingBottomSheet from "../../components/membership/MembershipSettingsBottomSheet";
import { useNavigate, useParams } from "react-router";
import { membershipApi } from "../../api/membership";
import type { UserMembershipDetail } from "../../api/membership";
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

export default function MembershipDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [detail, setDetail] = useState<UserMembershipDetail | null>(null);
    const [isMain, setIsMain] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 멤버십 상세 API + 대표 여부 확인
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const [detailRes, dashboardRes] = await Promise.all([
                    membershipApi.getUserMembershipDetail(Number(id)),
                    dashboardApi.getDashboard(),
                ]);

                if (detailRes.isSuccess && detailRes.result) {
                    setDetail(detailRes.result);
                }

                // mainMemberships에 포함되어 있으면 대표 멤버십
                if (dashboardRes.isSuccess && dashboardRes.result) {
                    const isInMain = dashboardRes.result.mainMemberships.some(
                        (m) => m.userMembershipBrandId === Number(id)
                    );
                    setIsMain(isInMain);
                }
            } catch (err) {
                console.error('Membership detail fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

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
        <Layout showBottomNav={!isBottomSheetOpen}>
            <div className="flex flex-col h-full bg-gray-50 overflow-y-auto scollbar-hide">

                {/* 공통 Header 사용 */}
                <Header
                    showBackButton={true}
                    title={detail.membershipBrandName}
                    rightAction={
                        <button
                            className="p-2 rounded-full transition-transform active:scale-95"
                            onClick={() => setIsBottomSheetOpen(true)}
                            aria-label="설정"
                        >
                            <img src={iconSetting} alt="설정" className="w-6 h-6" />
                        </button>
                    }
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
                            <button onClick={() => navigate(`/membership/${id}/change/select-method`)}>
                                <img src={iconEdit} alt="수정" className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex gap-2 w-full h-28 bg-white rounded-xl px-4 items-center">
                            {numberChunks.map((chunk, idx) => (
                                <div key={idx} className="flex-1 bg-gray-100 py-3 rounded-lg text-center font-semibold text-gray-600">
                                    {chunk}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. 적립/할인 가능한 매장 */}
                    <div className="px-6 mt-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">적립 / 할인 가능한 매장</h3>
                            <button
                                onClick={() => navigate(`/membership/${id}/benefits`)}>
                                <img src={iconPlus} alt="추가" className="w-6 h-6" />
                            </button>
                        </div>
                        {detail.storeBrands && detail.storeBrands.length > 0 ? (
                            <div className="flex justify-between items-center gap-4 overflow-x-auto scrollbar-hide w-full h-28 bg-white rounded-xl px-4 py-3">
                                {detail.storeBrands.map((store) => (
                                    <div key={store.storeBrandId} className="flex-shrink-0 flex flex-col items-center gap-1">
                                        <div className="w-14 h-14 rounded-xl border border-gray-100 overflow-hidden bg-white flex items-center justify-center">
                                            <img src={store.logoUrl} alt={store.name} className="w-14 h-14 object-contain" />
                                        </div>
                                        <span className="text-xs text-gray-500 truncate max-w-[56px]">{store.name}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm">등록된 매장이 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* 바텀시트 */}
            <MembershipSettingBottomSheet
                isOpen={isBottomSheetOpen}
                onClose={() => setIsBottomSheetOpen(false)}
                membershipId={id ?? ''}
                brandName={detail.membershipBrandName}
                membershipNumber={detail.membershipNumber}
                isMain={isMain}
                onSetFavorite={(newVal) => setIsMain(newVal)}
            />
        </Layout>
    );
}