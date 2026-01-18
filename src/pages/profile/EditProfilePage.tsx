import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import iconNaver from '../../assets/icons/sns/naver.svg';
import iconKakao from '../../assets/icons/sns/kakaotalk.svg';

/**
 * [PAGE 20] 내 정보 수정 페이지
 */
export default function EditProfilePage() {
    const navigate = useNavigate();

    // TODO: API에서 사용자 정보 가져오기
    const [name, setName] = useState('홍길동');
    const [email, setEmail] = useState('hong@example.com');
    const [phone, setPhone] = useState('010-1234-5678');

    const handleSave = () => {
        // TODO: 정보 수정 API 호출
        console.log('Update profile:', { name, email, phone });
        navigate('/my');
    };

    return (
        <Layout>
            <div className="w-full h-[128px] relative flex items-end border-b border-gray-200">
                {/* 뒤로가기 버튼 (왼쪽 고정) */}
                <button
                    onClick={() => navigate(-1)}
                    className="
                        absolute left-[16px] pb-4
                        p-2 rounded-full
                        hover:hover:cursor-pointer
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
                    개인정보 변경
                </h1>
            </div>  
            
            {/* 프로필 정보 리스트 */}
            <div className="mt-4 mb-4">
            
                {/* 이름 */}
                <div
                    className="
                    w-full h-18
                    bg-white
                    flex items-center justify-between
                    px-[25px]
                    "
                >
                    <span className="text-[20px] font-semibold">이름</span>
                    <span className="text-[20px] text-gray-500 font-normal">홍길동</span>
                </div>

                {/* 이메일 */}
                <div
                    className="
                    w-full h-18
                    bg-white
                    flex items-center justify-between
                    px-[25px]
                    "
                >
                    <span className="text-[20px] font-semibold">이메일</span>
                    <span className="text-[20px] text-gray-500 font-normal">hong@example.com</span>
                </div>

                {/* 전화번호 */}
                <div
                    className="
                    w-full h-18
                    bg-white
                    flex items-center justify-between
                    px-[25px]
                    "
                >
                    <span className="text-[20px] font-semibold">전화번호</span>
                    <span className="text-[20px] text-gray-500 font-normal">010-1234-5678</span>
                </div>
                {/* 비밀번호 변경 */}
                <button
                    onClick={() => navigate('/profile/edit/password')}
                    className="
                    w-full h-18
                    bg-white
                    flex items-center justify-between
                    pl-[25px] pr-[16px]
                    hover:cursor-pointer
                    "
                >
                    <span className="text-[20px] font-semibold">비밀번호 변경</span>
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>       
                {/* 생년월일 변경 */}
                <button
                    onClick={() => navigate('/profile/edit/birthday')}
                    className="
                    w-full h-18
                    bg-white
                    flex items-center justify-between
                    pl-[25px] pr-[16px]
                    hover:cursor-pointer
                    "
                >
                    <span className="text-[20px] font-semibold">생년월일 변경</span>
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>

            {/* 연동하기 */}
            <div className="flex-1 border-[4px] border-gray-100"></div>
            <div className="mt-6 flex items-center px-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-6 text-gray-300 text-sm">
                    연동하기
                </span>
                <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <div className="mt-6 mb-12 flex justify-center items-center">
                {/*카카오톡 연동*/}
                <button>
                    <img src={iconKakao} alt="Kakao Icon" className="w-[60px] h-[60px] mx-4 cursor-pointer" />
                </button>
                {/*네이버 연동*/}
                <button>
                    <img src={iconNaver} alt="Naver Icon" className="w-[60px] h-[60px] mx-4 cursor-pointer" />
                </button>
            </div>
            
                
        </Layout>
    );
}
