import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import ConfirmModal from "../../components/profile/ConfirmModal";
import Header from "../../components/common/Header";

/**
 * [PAGE 20] 로그아웃 페이지
 */
export default function LogoutPage() {
    const navigate = useNavigate();
    return (
        <Layout>
            <Header title="로그아웃" />  

            <ConfirmModal 
                message="로그아웃 하시겠습니까?"
                onCancel={() => navigate(-1)} 
                onConfirm={() => navigate("/login")}
            />
        </Layout>
    );
}