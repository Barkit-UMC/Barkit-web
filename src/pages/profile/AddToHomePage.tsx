import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";

/**
 * [PAGE 20] 홈 화면에 추가 페이지
 */
export default function AddToHomePage() {
    const navigate = useNavigate();
    return (
        <Layout>
            {/*<Header title="홈 화면에 추가" />*/}
            <div className="w-full h-[128px] relative flex items-end border-b border-gray-200">
                {/* 뒤로가기 버튼 (왼쪽 고정) */}
                <button
                    onClick={() => navigate(-1)}
                    className="
                        absolute left-[16px] pb-4
                        p-2 rounded-full
                        hover:cursor-pointer
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
                    홈 화면에 추가
                </h1>
            </div>  
            {/* 내용 영역 */}
            <div className="mt-4 mb-4">
                <div
                    className="
                    w-full h-18
                    bg-white
                    flex items-center justify-between
                    px-[25px]
                    "
                >
                    <span className="text-[20px] font-semibold">직접 설치</span>
                </div>
                {/* 설명 */}
                <div className="h-[200px] w-[343px] rounded-xl bg-gray-100 mx-auto flex flex-col">
                    <p className="p-5 font-[14px] text-gray-300">방식 설명은<br/>추후 업데이트 예정입니다.</p>
                </div>

                <div
                    className="
                    w-full h-18
                    bg-white mt-4
                    flex items-center justify-between
                    px-[25px]
                    "
                >
                    <span className="text-[20px] font-semibold">설치 방법</span>
                </div>
                {/* 설명 */}
                <div className="h-[200px] w-[343px] rounded-xl bg-gray-100 mx-auto flex flex-col">
                    <p className="p-5 font-[14px] text-gray-300">방식 설명은<br/>추후 업데이트 예정입니다.</p>
                </div>
            </div>
        </Layout>
    );
}