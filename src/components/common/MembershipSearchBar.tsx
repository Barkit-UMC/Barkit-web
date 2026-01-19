interface MembershipSearchBarProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    placeholder?: string;
    onSearchClick?: () => void;
    iconSearch: string;
}

export default function MembershipSearchBar({
    searchQuery,
    setSearchQuery,
    placeholder = "멤버십 브랜드 검색하기 ex) 스타벅스",
    onSearchClick,
    iconSearch
}: MembershipSearchBarProps) {
    return (
        <div className="bg-[#F9F9F9] w-[343px] h-[54px] mx-auto flex items-center">
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 px-4 pr-12 rounded-full
                               bg-[#AAE8F5]/10 border-1 border-[#00C0E8]
                               focus:outline-none focus:ring-0 focus:border-[#00C0E8]
                               text-[14px] placeholder:text-[14px] placeholder:text-gray-300"
                />
                <button
                    onClick={onSearchClick}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
                >
                    <img
                        src={iconSearch}
                        alt="검색"
                        className="w-6 h-6"
                    />
                </button>
            </div>
        </div>
    );
}