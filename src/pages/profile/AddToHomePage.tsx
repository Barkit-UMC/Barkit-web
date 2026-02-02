import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";

/**
 * [PAGE 20] 홈 화면에 추가 페이지
 */
export default function AddToHomePage() {
    const navigate = useNavigate();
    return (
        <Layout>
            <Header title="홈 화면에 추가" />  
            {/* 내용 영역 */}
            <div className="mt-16 mb-4">
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