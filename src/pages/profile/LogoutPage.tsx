import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import ConfirmModal from "../../components/profile/ConfirmModal";
import Header from "../../components/common/Header";
import { authApi } from "../../api/auth";

/**
 * [PAGE 20] 로그아웃 페이지
 */
export default function LogoutPage() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // 로그아웃 API 호출
        authApi.logout({
            refreshToken: localStorage.getItem("refreshToken") || ""
        }).then(() => {
            // 로그아웃 성공 시 로컬 스토리지 초기화
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
        });
    };
    return (
        <Layout>
            <Header title="로그아웃" />  

            <ConfirmModal 
                message="로그아웃 하시겠습니까?"
                onCancel={() => navigate(-1)} 
                onConfirm={() => {
                    handleLogout();
                    navigate("/login");
                }}
            />
        </Layout>
    );
}