import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import ConfirmModal from "../../components/profile/ConfirmModal";
import Header from "../../components/common/Header";

/**
 * [PAGE 20] 회원탈퇴 페이지
 */
export default function UnscribePage() {
    const navigate = useNavigate();
    return (
        <Layout>
            <Header title="회원탈퇴" />
            
            <ConfirmModal
                message="정말 회원 탈퇴를 진행하시겠습니까?"
                alert="* 이 작업은 되돌릴 수 없습니다"
                onCancel={() => navigate(-1)}
                onConfirm={() => navigate("/login")}
            /> 
        </Layout>
    );
}