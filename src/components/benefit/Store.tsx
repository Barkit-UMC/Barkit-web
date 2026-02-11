interface StoreProps {
  storeName: string;
  storeImageUrl: string;
}

export default function Store({ storeName, storeImageUrl }: StoreProps) {
  return (
    <div className="w-[95%] h-23 bg-white rounded-xl mb-4 flex items-center">
      <img
        src={storeImageUrl}
        alt={`${storeName} 이미지`}
        className="w-16 h-16 rounded-lg m-4"
      />
      <p className="text-[20px] font-semibold">{storeName}</p>
    </div>
  );
}
