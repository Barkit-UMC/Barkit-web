import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoreList from "../../components/benefit/StoreList";
import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";
import LoadingDots from "../../components/common/LoadingDots";
import useStore from "../../hooks/useStore";
import MembershipSearchBar from "../../components/common/MembershipSearchBar";

export default function BenefitStorePage() {
  const { id } = useParams<{ id: string }>();
  const userMembershipBrandId = Number(id);

  if (!id || isNaN(userMembershipBrandId)) {
    return (
      <Layout showBottomNav={true}>
        <Header title="적립/할인 가능한 매장" />
        <div className="pt-48 bg-gray-50 min-h-[calc(100vh-66px)] 
                px-4 flex items-center justify-center text-gray-400">
          잘못된 접근입니다
        </div>
      </Layout>
    );
  }

  const { stores, loading, resetAndFetch } = useStore(userMembershipBrandId);

  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // 디바운스 + 서버 요청
  useEffect(() => {
    const query = searchQuery.trim();

    // 입력이 비어있으면 전체 리스트 보여주기
    if (query === "") {
      resetAndFetch(""); 
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    const timer = setTimeout(async () => {
      await resetAndFetch(query); // 서버 요청 완료까지 기다림
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 검색 버튼 클릭 시 즉시 검색
  const handleSearchClick = async () => {
    setIsTyping(true);
    await resetAndFetch(searchQuery.trim());
    setIsTyping(false);
  };

  const showLoading = loading || isTyping;

  return (
    <Layout showBottomNav={true}>
      <Header title="적립/할인 가능한 매장" />
      <div className="pt-24 pb-4 bg-gray-50 fixed w-full top-[20px] z-20">
        <MembershipSearchBar
          placeholder="올리브영"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchClick={handleSearchClick}
        />
      </div>

      <div className="pt-48 bg-gray-50 min-h-[calc(100vh-66px)] px-4">
        {showLoading ? (
          <div className="w-full h-[200px] flex items-center justify-center">
            <LoadingDots />
          </div>
        ) : stores.length === 0 ? (
          <div className="w-full h-[200px] flex items-center justify-center text-gray-400">
            검색 결과가 없습니다
          </div>
        ) : (
          <StoreList stores={stores} />
        )}
      </div>
    </Layout>
  );
}
