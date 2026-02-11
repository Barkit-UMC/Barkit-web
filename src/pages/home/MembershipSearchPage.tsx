import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import MembershipSearchBar from '../../components/common/SearchBar';
import LoadingDots from '../../components/common/LoadingDots';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { membershipApi } from '../../api/membership';

interface FoundMembership {
    userMembershipBrandId: number;
    name: string;
    logoUrl: string;
}

export default function MembershipSearchPage() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState<'idle' | 'found' | 'not-found'>('idle');
    const [foundMembership, setFoundMembership] = useState<FoundMembership | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchQueryChange = (value: string) => {
        setSearchQuery(value);

        if (value.trim() !== "") {
            setSearchResult('idle');
            setFoundMembership(null);
        }
    };

    // 검색 API 호출
    const handleSearch = async () => {
        if (searchQuery.trim() === "") {
            setSearchResult('idle');
            return;
        }

        try {
            setIsLoading(true);

            const result = await membershipApi.searchUserMembershipBrands(
                searchQuery
            );

            if (result.brands.length > 0) {
                setFoundMembership(result.brands[0]); // 첫 번째 결과 사용
                setSearchResult('found');
            } else {
                setFoundMembership(null);
                setSearchResult('not-found');
            }
        } catch (e) {
            console.error('검색 실패', e);
            setSearchResult('not-found');
        } finally {
            setIsLoading(false);
        }
    };

    const handleShowBarcode = () => {
        if (!foundMembership) return;
        navigate(`/membership/${foundMembership.userMembershipBrandId}`);
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <Layout showBottomNav={false}>
            <div className="flex h-full bg-gray-50">
                <Header title="멤버십 브랜드 검색" showBackButton />

                <div className="flex-1 flex flex-col pt-[96px] pb-20">
                    <div className="mt-4 mb-4">
                        <MembershipSearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={handleSearchQueryChange}
                            onSearchClick={handleSearch}
                            placeholder='KT'
                        />
                    </div>

                    <div className="flex-1 flex flex-col px-6">
                        {/* 검색 전 */}
                        {!isLoading && searchResult === 'idle' && searchQuery.trim() === "" && (
                            <div className="h-[400px]" />
                        )}

                        {/* 검색 중 */}
                        {isLoading && (
                            <div className="flex items-center justify-center py-20">
                                <LoadingDots />
                            </div>
                        )}

                        {/* 검색 완료 - 보유 */}
                        {!isLoading && searchResult === 'found' && foundMembership && (
                            <div className="flex flex-col min-h-[calc(100vh-200px)]">
                                <div className="grid grid-cols-3 gap-4 mb-10">
                                    <div className="flex flex-col items-center gap-[10px] w-[90px]">
                                        <div className="w-[90px] h-[90px] rounded-[16px] overflow-hidden">
                                            <img
                                                src={foundMembership.logoUrl}
                                                alt={foundMembership.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="text-[16px] font-normal text-center">
                                            {foundMembership.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-auto pb-10 space-y-3">
                                    <button
                                        onClick={handleGoHome}
                                        className="w-full h-14 bg-[#00C0E8]/5 rounded-[28px] text-[#00C0E8] text-[16px] font-semibold"
                                    >
                                        취소
                                    </button>
                                    <button
                                        onClick={handleShowBarcode}
                                        className="w-full h-14 bg-[#00C0E8] text-white rounded-[28px] text-[16px] font-semibold"
                                    >
                                        바코드 제시하기
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 검색 결과 없음 */}
                        {!isLoading && searchResult === 'not-found' && (
                            <div className="flex flex-col min-h-[calc(100vh-200px)]">
                                <div className="flex-1 flex items-start pt-20">
                                    <p className="text-gray-200 text-[16px] w-full text-center">
                                        검색 결과가 없습니다
                                    </p>
                                </div>

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
