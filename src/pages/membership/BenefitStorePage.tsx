import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import StoreList from "../../components/benefit/StoreList";
import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";
import LoadingDots from "../../components/common/LoadingDots";
import useInfiniteStore from "../../hooks/useInfiniteStore";
import SearchBar from "../../components/common/SearchBar";

export default function BenefitStorePage() {
  const { id } = useParams<{ id: string }>();
  const brandId = Number(id);
  const isValidId = !!id && !Number.isNaN(brandId);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteStore(isValidId ? brandId : 0, debouncedQuery);

  const stores = data?.pages.flatMap(page => page.stores) ?? [];

  // infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

    const handleSearchClick = () => {
    setDebouncedQuery(searchQuery.trim());
  };

  if (!isValidId) {
    return (
      <Layout showBottomNav>
        <Header title="적립/할인 가능한 매장" />
        <div className="pt-48 flex justify-center text-gray-400">
          잘못된 접근입니다
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBottomNav>
      <Header title="적립/할인 가능한 매장" />

      <div className="pt-24 pb-4 bg-gray-50 fixed w-full top-[20px] z-20">
        <SearchBar
          placeholder="올리브영"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchClick={handleSearchClick}
        />
      </div>

      <div className="pt-48 bg-gray-50 min-h-[calc(100vh-66px)] px-4">
        {isLoading && (
          <div className="w-full h-[200px] flex items-center justify-center">
            <LoadingDots />
          </div>
        )}

        {!isLoading && stores.length === 0 && (
          <div className="w-full h-[200px] flex items-center justify-center text-gray-400">
            검색 결과가 없습니다
          </div>
        )}

        <StoreList stores={stores} />

        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="w-full h-20 flex justify-center items-center"
          >
            <LoadingDots />
          </div>
        )}
      </div>
    </Layout>
  );
}
