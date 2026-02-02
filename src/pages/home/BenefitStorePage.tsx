import { useState } from "react";
import StoreList from "../../components/benefit/StoreList";
import Header from "../../components/common/Header";
import Layout from "../../components/common/Layout";
import MembershipSearchBar from "../../components/common/MembershipSearchBar";

export default function BenefitStorePage() {
    const [searchQuery, setSearchQuery] = useState("");

    const onSearchClick = () => {
        console.log("Search clicked with query:", searchQuery);
    };

    return (
        <Layout showBottomNav={true}>
            <Header title="적립/할인 가능한 매장" />
            <div className="mt-24 px-4 bg-gray-50">
                <MembershipSearchBar 
                    placeholder="올리브영" 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearchClick={onSearchClick}
                />
                <div className="mt-4 mb-2 text-gray-500 text-sm">
                    <StoreList searchQuery={searchQuery} />
                </div>
                
            </div>
            
            
        </Layout>
    );
}