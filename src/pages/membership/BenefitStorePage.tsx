import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoreList from "../../components/benefit/StoreList";
import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";
import MembershipSearchBar from "../../components/common/MembershipSearchBar";
import LoadingDots from "../../components/common/LoadingDots";
import useStore from "../../hooks/useStore";

export default function BenefitStorePage() {
  // URL에서 brandId 파라미터 가져오기
  const { brandId } = useParams<{ brandId: string }>();
  const userMembershipBrandId = Number(brandId); // string → number 변환

  const { stores, loading, fetchStores } = useStore(userMembershipBrandId);

  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  useEffect(() => {
    if (!isNaN(userMembershipBrandId)) {
      fetchStores();
    }
  }, [userMembershipBrandId]);

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
      ? stores
      : stores.filter(store => store.brandName.includes(appliedQuery));

  return (
    <Layout showBottomNav={true}>
      <Header title="적립/할인 가능한 매장" />
      <div className="pt-24 pb-4 bg-gray-50 fixed w-full top-[20px] z-20">
        <MembershipSearchBar
          placeholder="올리브영"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchClick={onSearchClick}
        />
      </div>
      <div className="pt-48 bg-gray-50 min-h-[calc(100vh-66px)] px-4">
        {(loading || isTyping) ? (
          <div className="w-full h-[200px] flex items-center justify-center">
            <LoadingDots />
          </div>
        ) : hasSearched && filteredStores.length === 0 ? (
          <div className="w-full h-[200px] flex items-center justify-center text-gray-400">
            검색 결과가 없습니다
          </div>
        ) : (
          <StoreList stores={filteredStores} />
        )}
      </div>
    </Layout>
  );
}
