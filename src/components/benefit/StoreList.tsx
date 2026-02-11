import Store from "./Store";
import type { Store as StoreType } from "../../types/store";

interface StoreListProps {
  stores: StoreType[];
}

export default function StoreList({ stores }: StoreListProps) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      {stores.map(store => (
        <Store
          key={store.storeId}
          storeName={store.brandName}
          storeImageUrl={store.storeImageUrl}
        />
      ))}
    </div>
  );
}
