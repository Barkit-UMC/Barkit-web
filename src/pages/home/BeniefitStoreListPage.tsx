import { useState } from 'react';
import StoreItem from '../../components/store/StoreItem';
import Header from '../../components/common/Header';
import iconStarbucks from '../../assets/icons/stores/starbucks.svg'

interface Store {
  id: string;
  name: string;
  info: string;
  logo: string;
}

export default function BenefitStoreListPage() {
  // TODO: 나중에 API로 교체
  const [stores, setStores] = useState<Store[]>([
    {
      id: '1',
      name: '스타벅스',
      info: '할인/적립 정보',
      logo: iconStarbucks
    },
    {
      id: '2',
      name: '스타벅스',
      info: '할인/적립 정보',
      logo: iconStarbucks
    },
    {
      id: '3',
      name: '스타벅스',
      info: '할인/적립 정보',
      logo: iconStarbucks
    },
    {
      id: '4',
      name: '스타벅스',
      info: '할인/적립 정보',
      logo: iconStarbucks
    },
    {
      id: '5',
      name: '스타벅스',
      info: '할인/적립 정보',
      logo: iconStarbucks
    },
    {
      id: '6',
      name: '스타벅스',
      info: '할인/적립 정보',
      logo: iconStarbucks
    },
    {
      id: '7',
      name: '스타벅스',
      info: '할인/적립 정보',
      logo: iconStarbucks
    },
    {
      id: '8',
      name: '스타벅스',
      info: '할인/적립 정보',
      logo: iconStarbucks
    }
  ]);

  const handleShareClick = (id: string) => {
    
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="적립/할인 가능한 매장" />

      {/* 스토어 리스트 */}
      <div className="px-4 py-6">
        <div className="w-full max-w-[343px] mx-auto mt-4 space-y-6">
          {stores.map((store) => (
            <StoreItem
              key={store.id}
              id={store.id}
              name={store.name}
              info={store.info}
              logoUrl={store.logo}
              onShare={handleShareClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}