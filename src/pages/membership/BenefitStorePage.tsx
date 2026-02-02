import { useEffect, useState } from "react";
import StoreList, { STORES } from "../../components/benefit/StoreList";
import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";
import MembershipSearchBar from "../../components/common/MembershipSearchBar";
import LoadingDots from "../../components/common/LoadingDots";

export default function BenefitStorePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [appliedQuery, setAppliedQuery] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [hasSearched, setHasSearched] = useState(true);

    useEffect(() => {
        if (!hasSearched) return;

        setIsTyping(true);

        const timer = setTimeout(() => {
            setAppliedQuery(searchQuery.trim());
            setIsTyping(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, hasSearched]);

    const onSearchClick = () => {
        setHasSearched(true);
        setIsTyping(true);

        setTimeout(() => {
            setAppliedQuery(searchQuery.trim());
            setIsTyping(false);
        }, 500);
    };

    const filteredStores =
        appliedQuery === ""
            ? STORES
            : STORES.filter(store =>
                  store.storeName.includes(appliedQuery)
              );

    return (
        <Layout showBottomNav={true}>
            <Header title="적립/할인 가능한 매장" />

            <div className="pt-24 px-4 bg-gray-50 min-h-[calc(100vh-66px)]">
                <MembershipSearchBar
                    placeholder="올리브영"
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearchClick={onSearchClick}
                />

                {/* 🔹 결과 영역 */}
                <div className="mt-4">
                    {isTyping ? (
                        <div className="w-full h-[200px] flex items-center justify-center">
                            <LoadingDots />
                        </div>
                        ) : ( hasSearched && filteredStores.length === 0 ? (
                            <div className="w-full h-[200px] flex items-center justify-center text-gray-400">
                                검색 결과가 없습니다
                            </div>
                        ) : (
                            <StoreList stores={filteredStores} />
                        )
                    )}
                </div>
            </div>
        </Layout>
    );
}
