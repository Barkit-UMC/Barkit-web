import Store from "./Store";
import oliveyoung from "../../assets/icons/store/oliveyoung.svg";
import cgv from "../../assets/icons/store/cgv.svg";
import cu from "../../assets/icons/store/cu.svg";
import megacoffee from "../../assets/icons/store/megacoffee.svg";
import tving from "../../assets/icons/store/tving.svg";
import boribori from "../../assets/icons/store/boribori.svg";

interface StoreListProps {
    stores: {
        storeName: string;
        storeImageUrl: string;
    }[];
}

export const STORES = [
    { storeName: "올리브영", storeImageUrl: oliveyoung },
    { storeName: "CGV", storeImageUrl: cgv },
    { storeName: "CU", storeImageUrl: cu },
    { storeName: "메가MGC커피", storeImageUrl: megacoffee },
    { storeName: "TVING", storeImageUrl: tving },
    { storeName: "보리보리", storeImageUrl: boribori },
];

export default function StoreList({ stores }: StoreListProps) {
    return (
        <div className="w-full h-full flex flex-col items-center">
            {stores.map((store, idx) => (
                <Store
                    key={idx}
                    storeName={store.storeName}
                    storeImageUrl={store.storeImageUrl}
                />
            ))}
        </div>
    );
}
