import searchIcon from '../../assets/icons/search/search_white.svg';

interface MembershipSearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  placeholder: string;
  onSearchClick: () => void;
}

export default function MembershipSearchBar({
  searchQuery,
  setSearchQuery,
  placeholder,
  onSearchClick,
}: MembershipSearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };

  return (
    <div className="w-[345px] h-[56px] mx-auto">
      <div className="flex w-full h-full border border-[#00C0E8] rounded-[10px] overflow-hidden bg-[#AAE8F5]/10">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 text-[14px] placeholder:text-gray-300 bg-transparent focus:outline-none"
        />

        <button
          onClick={onSearchClick}
          className="w-[69px] h-full flex items-center justify-center bg-[#00C0E8]"
        >
          <img src={searchIcon} alt="검색" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}