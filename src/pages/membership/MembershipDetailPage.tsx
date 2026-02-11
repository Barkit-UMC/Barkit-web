import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";
import iconSetting from '../../assets/icons/memberships/iconSetting.svg';
import iconEdit from '../../assets/icons/memberships/iconEdit.svg';
import iconPlus from '../../assets/icons/memberships/iconPlus.svg';
import MembershipCard from "../../components/membership/MembershipCard";
import { useEffect, useState } from "react";
import MembershipSettingBottomSheet from "../../components/membership/MembershipSettingsBottomSheet";
import { useNavigate, useParams } from "react-router";
import { dashboardApi } from "../../api/dashboard";
import type { MainMembership } from "../../api/dashboard";

// 브랜드 ID → 로컬 아이콘 매핑 (WalletPage와 동일)
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
    1: { icon: cjoneIcon, color: '#1a1a2e' },
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
    BRAND_META[brandId]?.color || '#1F2937';

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
    const [membership, setMembership] = useState<MainMembership | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 대시보드 API에서 해당 멤버십 데이터 가져오기
    useEffect(() => {
        const fetchMembership = async () => {
            try {
                const response = await dashboardApi.getDashboard();
                if (response.isSuccess && response.result) {
                    const { mainMemberships, memberships } = response.result;

                    // mainMemberships에서 먼저 찾고, 없으면 memberships에서 찾기
                    const found = mainMemberships.find(
                        (m) => m.userMembershipBrandId === Number(id)
                    );

                    if (found) {
                        setMembership(found);
                    } else {
                        // memberships 목록에서 찾기 (membershipNumber가 없을 수 있음)
                        const fromList = memberships.find(
                            (m) => m.userMembershipBrandId === Number(id)
                        );
                        if (fromList) {
                            // MembershipSummary → MainMembership 변환 (membershipNumber 없음)
                            setMembership({
                                ...fromList,
                                membershipNumber: '',
                            });
                        }
                    }
                }
            } catch (err) {
                console.error('Membership detail fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMembership();
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

    if (!membership) {
        return (
            <Layout showBottomNav>
                <Header showBackButton title="멤버십 상세" />
                <div className="flex items-center justify-center h-screen">
                    <p className="text-gray-500">멤버십을 찾을 수 없습니다.</p>
                </div>
            </Layout>
        );
    }

    const numberChunks = formatMembershipNumber(membership.membershipNumber);

    return (
        <Layout showBottomNav={!isBottomSheetOpen}>
            <div className="flex flex-col h-full bg-white overflow-y-auto scollbar-hide">

                {/* 공통 Header 사용 */}
                <Header
                    showBackButton={true}
                    title={membership.name}
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
                            brandName={membership.name}
                            brandLogo={getBrandIcon(membership.membershipBrandId, membership.logoUrl)}
                            brandColor={getBrandColor(membership.membershipBrandId)}
                            membershipNumber={membership.membershipNumber}
                        />
                    </div>

                    {/* 2. 멤버십 번호 */}
                    <div className="px-6 mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">멤버십 번호</h3>
                            <button>
                                <img src={iconEdit} alt="수정" className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            {numberChunks.map((chunk, idx) => (
                                <div key={idx} className="flex-1 bg-gray-100 py-3 rounded-lg text-center font-semibold text-gray-600">
                                    {chunk}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. 적립/할인 가능한 매장 — 추후 API 연동 */}
                    <div className="px-6 mt-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">적립 / 할인 가능한 매장</h3>
                            <button
                                onClick={() => navigate(`/membership/${id}/benefits`)}>
                                <img src={iconPlus} alt="추가" className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-gray-400 text-sm">매장 데이터는 추후 연동 예정입니다.</p>
                    </div>
                </div>
            </div>

            {/* 바텀시트 */}
            <MembershipSettingBottomSheet
                isOpen={isBottomSheetOpen}
                onClose={() => setIsBottomSheetOpen(false)}
                membershipId={id ?? ''}
            />
        </Layout>
    );
}