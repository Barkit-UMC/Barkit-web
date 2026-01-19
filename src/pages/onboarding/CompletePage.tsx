import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import SuccessView from '../../components/common/SuccessView';

/**
 * 멤버십 등록 완료 페이지
 * - SuccessView 공통 컴포넌트 사용
 * - 버튼 클릭 시 스토어 리셋 및 홈으로 이동
 */
export default function CompletePage() {
    const navigate = useNavigate();
    const { reset } = useOnboardingStore();

    const handleGoHome = () => {
        reset(); // 온보딩 데이터 초기화
        navigate('/home');
    };

    return (
        <SuccessView
            title={
                <>
                    축하합니다!<br />
                    멤버십 등록이 완료되었어요
                </>
            }
            buttonText="홈으로"
            onButtonClick={handleGoHome}
        />
    );
}
