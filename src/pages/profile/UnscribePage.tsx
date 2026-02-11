import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import ConfirmModal from "../../components/profile/ConfirmModal";
import Header from "../../components/common/Header";
import apiClient from '../../api/axios';

/**
 * [PAGE 20] 회원탈퇴 페이지
 */

export default function UnscribePage() {
    const navigate = useNavigate();

    // 회원탈퇴 API 호출 함수
    const handleUnsubscribe = async () => {
        try {
        // 1. 실제 API 호출 (엔드포인트는 백엔드 명세에 맞춰 수정)
        await apiClient.delete("/api/users/me"); 

        // 2. 로컬 스토리지 등에 저장된 인증 정보(토큰) 삭제
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // 만약 세션 스토리지를 쓴다면 sessionStorage.clear();

        alert("회원 탈퇴가 완료되었습니다.");

        // 3. 로그인 또는 메인 페이지로 이동 (replace: true로 뒤로가기 방지)
        navigate("/login", { replace: true });
        } catch (error) {
        console.error("탈퇴 처리 중 오류 발생:", error);
        alert("탈퇴 처리 중 문제가 발생했습니다. 다시 시도해 주세요.");
        }
    };
    
    return (
        <Layout>
            <Header title="회원탈퇴" />
            
            <ConfirmModal
                message="정말 회원 탈퇴를 진행하시겠습니까?"
                alert="* 이 작업은 되돌릴 수 없습니다"
                onCancel={() => navigate(-1)}
                onConfirm={handleUnsubscribe}
            /> 
        </Layout>
    );
}