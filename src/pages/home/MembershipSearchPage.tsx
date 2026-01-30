import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import MembershipSearchBar from '../../components/common/MembershipSearchBar';
import LoadingDots from '../../components/common/LoadingDots';
import SearchIcon from '../../assets/icons/search/search_white.png';
import CjoneIcon from '../../assets/icons/memberships/cjone.svg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 사용자가 보유한 멤버십 데이터 (실제로는 API에서 가져오기)
const USER_MEMBERSHIPS = [
    { id: 1, name: "CJ ONE", logo: CjoneIcon, barcode: "1234567890" },
];

export default function MembershipSearchPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState<'idle' | 'found' | 'not-found'>('idle');
    const [foundMembership, setFoundMembership] = useState<any>(null);

    const handleSearchQueryChange = (value: string) => {
        setSearchQuery(value);
        // 검색어가 입력되면 결과 초기화
        if (value.trim() !== "") {
            setSearchResult('idle');
            setFoundMembership(null);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setSearchResult('idle');
            return;
        }

        const found = USER_MEMBERSHIPS.find(membership =>
            membership.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (found) {
            setSearchResult('found');
            setFoundMembership(found);
        } else {
            setSearchResult('not-found');
            setFoundMembership(null);
        }
    };

    const handleShowBarcode = () => {
        navigate(`/membership/${foundMembership.id}/barcode`);
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    // 검색 중 상태 판단
    const isSearching = searchQuery.trim() !== "" && searchResult === 'idle';

    return (
        <Layout showBottomNav={false}>
            <div className="min-h-screen bg-gray-50">
                <Header 
                    title="멤버십 브랜드 검색"
                    showBackButton={true}
                />
                
                <div className="pt-[64px] pb-20">
                    {/* 서치바 */}
                    <div className="py-4 mt-4 mb-4">
                        <MembershipSearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={handleSearchQueryChange}
                            onSearchClick={handleSearch}
                            iconSearch={SearchIcon}
                        />
                    </div>
                    
                    {/* 검색 결과 영역 */}
                    <div className="px-6">
                        {/* 검색 전 */}
                        {!isSearching && searchResult === 'idle' && searchQuery.trim() === "" && (
                            <div className="h-[400px]" />
                        )}

                        {/* 검색 중 */}
                        {isSearching && (
                            <div className="flex items-center justify-center py-20">
                                <LoadingDots />
                            </div>
                        )}

                        {/* 검색 완료 - 멤버십 보유 */}
                        {searchResult === 'found' && foundMembership && (
                            <div className="flex flex-col min-h-[calc(100vh-200px)]">
                                <div className="grid grid-cols-3 gap-4 mb-10">
                                    <div className="flex flex-col items-center gap-[10px] w-[90px]">
                                        <div className="w-[90px] h-[90px] rounded-[16px] overflow-hidden">
                                            <img
                                                src={foundMembership.logo}
                                                alt={foundMembership.name}
                                                className="w-full h-full object-cover scale-105"
                                            />
                                        </div>
                                        <span className="text-[16px] font-normal text-center">
                                            {foundMembership.name}
                                        </span>
                                    </div>
                                </div>

                                {/* 버튼 */}
                                <div className="w-full space-y-3 mt-auto mb-8">
                                    <button
                                        onClick={handleGoHome}
                                        className="w-full h-[54px] bg-[#00C0E8]/5 rounded-[28px] text-[#00C0E8] text-[16px] font-semibold"
                                    >
                                        취소
                                    </button>
                                    <button
                                        onClick={handleShowBarcode}
                                        className="w-full h-[54px] bg-[#00C0E8] text-white rounded-[28px] text-[16px] font-semibold"
                                    >
                                        바코드 제시하기
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 검색 완료 - 멤버십 미보유 */}
                        {searchResult === 'not-found' && (
                            <div className="flex flex-col min-h-[calc(100vh-200px)]">
                                <div className="flex-1 flex items-start pt-20">
                                    <p className="text-gray-200 text-[16px] w-full text-center">
                                        검색 결과가 없습니다
                                    </p>
                                </div>

                                {/* 버튼 */}
                                <div className="w-full mb-8">
                                    <button
                                        onClick={handleGoHome}
                                        className="w-full h-[54px] bg-[#00C0E8] text-white rounded-[28px] text-[16px] font-semibold"
                                    >
                                        홈으로
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}