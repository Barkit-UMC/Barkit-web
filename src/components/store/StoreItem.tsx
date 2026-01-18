import iconUpRight from '../../assets/icons/benefit/up-right.svg'

interface StoreItemProps {
  id: string;
  name: string;
  info: string;
  logoUrl: string;
  onShare?: (id: string) => void;
}

export default function StoreItem({ id, name, info, logoUrl, onShare }: StoreItemProps) {
  return (
    <div className="flex items-center justify-between px-5 py-6 h-[93px] bg-white rounded-[20px]">
      <div className="flex items-center gap-3">
        <img 
          src={logoUrl} 
          alt={name}
          className="w-[57.64px] h-[57.64px] rounded-[11.88px] object-cover"
        />
        <div className="flex flex-col gap-[7px]">
          <span className="text-base font-semibold">{name}</span>
          <span className="text-sm font-regular text-gray-300">{info}</span>
        </div>
      </div>

      <button
        onClick={() => onShare?.(id)}
        className="w-11 h-11 rounded-full bg-[#00C0E8] flex items-center justify-center"
        aria-label="공유하기"
      >
        <img src={iconUpRight} className="w-6 h-6" />
      </button>
    </div>
  );
}