import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import ConfirmModal from "../../components/profile/ConfirmModal";

/**
 * [PAGE 20] 위치 권한 설정 페이지
 */
export default function LocationPermissionPage() {
    const navigate = useNavigate();
    return (
        <Layout>
            <div className="w-full h-[128px] relative flex items-end border-b border-gray-200">
                {/* 뒤로가기 버튼 (왼쪽 고정) */}
                <button
                    onClick={() => navigate(-1)}
                    className="
                        absolute left-[16px] pb-4
                        p-2 rounded-full
                        hover:bg-gray-100 transition-colors
                    "
                    aria-label="뒤로가기"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                {/* 가운데 타이틀 */}
                <h1 className="w-full text-center text-[20px] font-semibold pb-4">
                    위치 권한 설정
                </h1>
            </div>
            <ConfirmModal message="위치 권한 요청에 동의하시겠습니까?"
                onCancel={() => navigate(-1)} 
                onConfirm={() => navigate("/profile")}
            />
        </Layout>
    );
}