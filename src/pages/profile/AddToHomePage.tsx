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
                    <span className="text-[20px] font-semibold">아이폰(iOS)</span>
                </div>
                {/* 설명 */}
                <div className="h-[260px] w-[90%] rounded-xl bg-gray-100 mx-auto flex flex-col">
                    <p className="p-5 text-[16px]">
                        Safari 브라우저로 접속<br/>
                        BarKit 주소로 접속해주세요 (Safari만 가능)<br/>
                        공유 버튼 클릭<br/>
                        화면 하단의 공유 버튼을 눌러주세요<br/>
                        "홈 화면에 추가" 선택<br/>
                        메뉴를 스크롤해서 "홈 화면에 추가"를 찾아 눌러주세요<br/>
                        설치 완료!<br/>
                        홈 화면에 Barkit 앱 아이콘이 추가됩니다
                    </p>
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
                <div className="h-[260px] w-[90%] rounded-xl bg-gray-100 mx-auto flex flex-col">
                    <p className="p-5 text-[16px]">
                        Chrome 브라우저로 접속<br/>
                        BarKit 주소로 접속해주세요<br/>
                        메뉴 버튼 클릭<br/>
                        화면 우측 상단의 점 3개(:) 버튼을 눌러주세요<br/>
                        "홈 화면에 추가" 선택<br/>
                        메뉴에서 "홈 화면에 추가" 또는 "앱 설치"를 눌러주세요<br/>
                        설치 완료!<br/>
                        홈 화면에 Barkit 앱 아이콘이 추가됩니다<br/>
                    </p>
                </div>
            </div>
        </Layout>
    );
}