import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";

import iconSetting from '../../assets/icons/memberships/iconSetting.svg';
import iconEdit from '../../assets/icons/memberships/iconEdit.svg';
import iconPlus from '../../assets/icons/memberships/iconPlus.svg';

// 임시 데이터 (실제로는 API나 Props에서 가져옵니다)
const DUMMY_DATA = {
    name: "CJ ONE",
    barcode: "1234 5678 9123 8284",
    // 만약 이 배열이 비어있거나 null이면 왼쪽 화면처럼 보입니다.
    stores: [
        { id: 1, name: "OliveYoung", logo: "/logos/oliveyoung.png" },
        { id: 2, name: "CGV", logo: "/logos/cgv.png" },
        { id: 3, name: "CU", logo: "/logos/cu.png" },
        { id: 4, name: "TousLesJours", logo: "/logos/touslesjours.png" },
        { id: 5, name: "MegaCoffee", logo: "/logos/megacoffee.png" },
    ]
};

export default function MembershipDetailPage() {
    const data = DUMMY_DATA; // 데이터 소스

    return (
        <Layout showBottomNav={true}>
            <div className="flex flex-col h-full bg-white overflow-y-auto pb-10">
                
               {/* 공통 Header 사용 */}
                <Header 
                    showBackButton={true}
                    title={data.name}
                    rightAction={
                        <button 
                            className="p-2 rounded-full transition-transform active:scale-95"
                            // onClick={}
                            aria-label = "설정"
                        >
                            <img src={iconSetting} alt="설정" className="w-6 h-6" />
                        </button>
                    }
                />

                <div className="pt-20 overflow-y-auto scrollbar-hide">
                    <div className="px-6 py-4">
                        <div className="bg-[#2D161B] rounded-t-xl p-4 flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full" />
                            <span className="text-white font-medium">{data.name}</span>
                        </div>
                        <div className="bg-white border-x border-b rounded-b-xl p-8 flex flex-col items-center shadow-sm">
                            {/* 실제 바코드 라이브러리 등을 넣는 자리 */}
                            <div className="w-full h-24 bg-[url('/barcode-placeholder.png')] bg-contain bg-no-repeat bg-center" />
                        </div>
                    </div>

                    <div className="px-6 mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">멤버십 번호</h3>
                            <button><img src={iconEdit} alt="수정" className="w-6 h-6" /></button>
                        </div>
                        <div className="flex gap-2">
                            {data.barcode.split(' ').map((chunk, idx) => (
                                <div key={idx} className="flex-1 bg-gray-100 py-3 rounded-lg text-center font-semibold text-gray-600">
                                    {chunk}
                                </div>
                            ))}
                        </div>
                    </div>

                    {data.stores && data.stores.length > 0 && (
                        <div className="px-6 mt-10 pb-10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-800">적립 / 할인 가능한 매장</h3>
                                <button><img src={iconPlus} alt="추가" className="w-6 h-6" /></button>
                            </div>
                            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                                {data.stores.map((store) => (
                                    <div key={store.id} className="flex-shrink-0 w-14 h-14 rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white flex items-center justify-center">
                                        <img src={store.logo} alt={store.name} className="w-10 h-10 object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}