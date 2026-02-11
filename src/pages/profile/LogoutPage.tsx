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

    const refreshToken = localStorage.getItem("refreshToken") || "";
    if (!refreshToken) {
        // 리프레시 토큰이 없는 경우 로그인 페이지로 이동
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        navigate("/login", { replace: true });
    }
    const handleLogout = async () => {
        // 로그아웃 API 호출
        try {
            await authApi.logout({
                refreshToken
            });
            // 로컬 스토리지에서 토큰 제거
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
            // 로그인 페이지로 이동
            navigate("/login");
        } catch (error) {
            console.error("로그아웃 실패:", error);
                // 로그아웃 실패 시에도 토큰 제거 및 로그인 페이지로 이동
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
            navigate("/login", { replace: true });
        }
    };
    return (
        <Layout>
            <Header title="로그아웃" />  

            <ConfirmModal 
                message="로그아웃 하시겠습니까?"
                onCancel={() => navigate(-1)} 
                onConfirm={() => {
                    handleLogout();
                }}
            />
        </Layout>
    );
}