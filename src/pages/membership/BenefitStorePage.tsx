import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import StoreList from "../../components/benefit/StoreList";
import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";
import MembershipSearchBar from "../../components/common/SearchBar";
import LoadingDots from "../../components/common/LoadingDots";
import useStore from "../../hooks/useStore";

export default function BenefitStorePage() {
  const { id } = useParams<{ id: string }>();
  const userMembershipBrandId = Number(id);
  const isValidId = !!id && !Number.isNaN(userMembershipBrandId);

  // 고정된 resetAndFetch를 받아옵니다.
  const { stores, loading, resetAndFetch } = useStore(isValidId ? userMembershipBrandId : 0);
  const [searchQuery, setSearchQuery] = useState("");

  // 무한 요청 방지를 위한 디바운스 useEffect
  useEffect(() => {
    if (!isValidId) return;

    const query = searchQuery.trim();

    // 입력이 비었을 때 즉시 초기화
    if (query === "") {
      resetAndFetch("");
      return;
    }

    // 0.5초 디바운스
    const timer = setTimeout(() => {
      resetAndFetch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, isValidId, resetAndFetch]); // 💡 resetAndFetch 주소가 고정되어 폭주하지 않음

  const handleSearchClick = () => {
    if (!isValidId) return;
    resetAndFetch(searchQuery.trim());
  };

  if (!isValidId) {
    return (
      <Layout showBottomNav={true}>
        <Header title="적립/할인 가능한 매장" />
        <div className="pt-48 bg-gray-50 min-h-screen flex items-center justify-center text-gray-400">
          잘못된 접근입니다
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBottomNav={true}>
      <Header title="적립/할인 가능한 매장" />
      
      {/* 고정 헤더 영역 */}
      <div className="pt-24 pb-4 bg-gray-50 fixed w-full top-0 z-20">
        <MembershipSearchBar
          placeholder="매장명을 입력하세요"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchClick={handleSearchClick}
        />
      </div>

      {/* 리스트 영역 */}
      <div className="pt-48 bg-gray-50 min-h-screen px-4">
        {loading && stores.length === 0 ? (
          // 초기 로딩 시에만 로딩 도츠 표시
          <div className="w-full h-[300px] flex items-center justify-center">
            <LoadingDots />
          </div>
        ) : stores.length === 0 ? (
          <div className="w-full h-[300px] flex items-center justify-center text-gray-400">
            검색 결과가 없습니다
          </div>
        ) : (
          <div className="relative">
            {/* 💡 로딩 중일 때 리스트 위에 옅은 오버레이를 주면 깜빡임이 덜합니다 */}
            <div className={loading ? "opacity-50 pointer-events-none" : ""}>
              <StoreList stores={stores} />
            </div>
            {loading && (
               <div className="absolute inset-x-0 -bottom-10 flex justify-center py-4">
                 <LoadingDots />
               </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}