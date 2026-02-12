import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import type { ReactNode } from "react";

/**
 * [PAGE 20] 홈 화면에 추가 페이지
 */
export default function AddToHomePage() {
    const navigate = useNavigate();
    function StepItem({ num, children }: { num: number; children: ReactNode }) {
        return (
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full 
                    bg-black text-white text-[12px] font-semibold shrink-0">
                    {num}
                </div>
                <p className="text-[15px] leading-relaxed">{children}</p>
            </div>
        );
    }

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
                    <span className="text-[20px] font-semibold">아이폰(iOS)</span>
                </div>
                {/* 설명 */}
                <div className="min-h-[260px] w-[90%] rounded-xl bg-gray-100 mx-auto p-5 
                    flex flex-col justify-center gap-4">
                    <StepItem num={1}>
                        <b>Safari 브라우저</b>에서 <b>https://www.barkit.site/</b> 접속
                    </StepItem>

                    <StepItem num={2}>
                        화면 하단 <b>공유 버튼</b> 클릭
                    </StepItem>

                    <StepItem num={3}>
                        메뉴에서 <b>"홈 화면에 추가"</b> 선택
                    </StepItem>

                    <StepItem num={4}>
                        <b>설치 완료</b> → 홈 화면에 Barkit 앱 아이콘 생성
                    </StepItem>
                </div>


                <div
                    className="
                    w-full h-18
                    bg-white mt-4
                    flex items-center justify-between
                    px-[25px]
                    "
                >
                    <span className="text-[20px] font-semibold">안드로이드(Android)</span>
                </div>
                {/* 설명 */}
                <div className="min-h-[260px] w-[90%] rounded-xl bg-gray-100 mx-auto p-5 
                    flex flex-col justify-center gap-4">
                    <StepItem num={1}>
                        <b>Chrome 브라우저</b>에서 <b>https://www.barkit.site/</b> 접속
                    </StepItem>

                    <StepItem num={2}>
                        우측 상단 <b>⋮ 메뉴 버튼</b> 클릭
                    </StepItem>

                    <StepItem num={3}>
                        <b>"홈 화면에 추가"</b> 또는 <b>"앱 설치"</b> 선택
                    </StepItem>

                    <StepItem num={4}>
                        <b>설치 완료</b> → 홈 화면에 Barkit 앱 아이콘 생성
                    </StepItem>
                </div>

            </div>
        </Layout>
    );
}