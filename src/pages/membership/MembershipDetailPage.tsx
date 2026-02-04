import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";
import iconSetting from '../../assets/icons/memberships/iconSetting.svg';
import iconEdit from '../../assets/icons/memberships/iconEdit.svg';
import iconPlus from '../../assets/icons/memberships/iconPlus.svg';
import MembershipCard from "../../components/membership/MembershipCard";
import { useState } from "react";
import MembershipSettingBottomSheet from "../../components/membership/MembershipSettingsBottomSheet";
import cjoneIcon from '../../assets/icons/memberships/cjone.svg'
import { useNavigate } from "react-router";

interface Store {
  id: number;
  name: string;
  logo: string;
}

interface Membership {
    id: number;
    brandName: string;
    brandLogo: string;
    brandColor: string;
    barcode: string;
    stores: Store[];
}

// 임시 데이터 (실제로는 API나 Props에서 가져옵니다)
const DUMMY_DATA: Membership[] = [
    {
        id: 1,
        brandName: 'CJ ONE',
        brandLogo: cjoneIcon,
        brandColor: '#1a1a2e',
        barcode: "1234 5678 9123 8284",
        stores: [
        { id: 1, name: "OliveYoung", logo: "/logos/oliveyoung.png" },
        { id: 2, name: "CGV", logo: "/logos/cgv.png" },
        { id: 3, name: "CU", logo: "/logos/cu.png" },
        { id: 4, name: "TousLesJours", logo: "/logos/touslesjours.png" },
        { id: 5, name: "MegaCoffee", logo: "/logos/megacoffee.png" },
    ]
    },
];

export default function MembershipDetailPage() {
    const data = DUMMY_DATA; // 데이터 소스
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <Layout showBottomNav={!isBottomSheetOpen}>
            <div className="flex flex-col h-full bg-white overflow-y-auto scollbar-hide">
                
               {/* 공통 Header 사용 */}
                <Header 
                    showBackButton={true}
                    title={data[0].brandName}
                    rightAction={
                        <button 
                            className="p-2 rounded-full transition-transform active:scale-95"
                            onClick={() => setIsBottomSheetOpen(true)}
                            aria-label = "설정"
                        >
                            <img src={iconSetting} alt="설정" className="w-6 h-6" />
                        </button>
                    }
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
                            <button><img src={iconEdit} alt="수정" className="w-6 h-6" /></button>
                        </div>
                        <div className="flex gap-2">
                            {data[0].barcode.split(' ').map((chunk, idx) => (
                                <div key={idx} className="flex-1 bg-gray-100 py-3 rounded-lg text-center font-semibold text-gray-600">
                                    {chunk}
                                </div>
                            ))}
                        </div>
                    </div>

                    {data[0].stores && data[0].stores.length > 0 && (
                        <div className="px-6 mt-10">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800">적립 / 할인 가능한 매장</h3>
                                <button 
                                    onClick={() => navigate(`/membership/${data[0].id}/benefits`)}>
                                    <img src={iconPlus} alt="추가" className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                                {data[0].stores.map((store) => (
                                    <div key={store.id} className="flex-shrink-0 w-14 h-14 rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white flex items-center justify-center">
                                        <img src={store.logo} alt={store.name} className="w-10 h-10 object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 바텀시트 */}
            <MembershipSettingBottomSheet
                isOpen={isBottomSheetOpen}
                onClose={() => setIsBottomSheetOpen(false)}
            />
        </Layout>
    );
}