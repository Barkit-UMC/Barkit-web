import searchIcon from '../../assets/icons/search/search_white.svg';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  placeholder: string;
  onSearchClick: () => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  placeholder,
  onSearchClick,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };

  return (
    /* 1. 외부 컨테이너: 너비는 부모에 맞추고 최대 너비를 제한하여 PC 뷰 대응 */
    <div className="w-full px-6 pb-2">
      <div className="flex w-full h-12 sm:h-[56px] border border-[#00C0E8] rounded-[10px] overflow-hidden bg-[#AAE8F5]/10">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          /* 2. 인풋: 모바일에서 가독성을 위해 최소 16px 권장 (iOS 자동 줌 방지) */
          className="flex-1 px-4 text-base text-[16px] placeholder:text-gray-300 bg-transparent focus:outline-none text-black"
        />

        <button
          onClick={onSearchClick}
          /* 3. 버튼: 고정 폭 대신 비율이나 적절한 padding으로 모바일 터치 영역 확보 */
          className="w-14 sm:w-[69px] h-full flex items-center justify-center bg-[#00C0E8]"
          aria-label="검색"
        >
          <img src={searchIcon} alt="검색" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}