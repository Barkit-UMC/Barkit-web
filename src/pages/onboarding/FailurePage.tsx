import { useNavigate } from 'react-router-dom';
import ErrorView from '../../components/common/ErrorView';

/**
 * 멤버십 등록 실패 페이지
 * - ErrorView 공통 컴포넌트 사용
 * - 다시 시도 / 홈으로 버튼 제공
 */
export default function FailurePage() {
    const navigate = useNavigate();

    const handleRetry = () => {
        // 등록 페이지로 다시 이동
        navigate('/onboarding/register');
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <ErrorView
            title={
                <>
                    아차!<br />
                    멤버십 등록에 실패했어요.<br />
                    다시 해볼까요?
                </>
            }
            primaryButtonText="다시 시도하기"
            onPrimaryClick={handleRetry}
            secondaryButtonText="홈으로"
            onSecondaryClick={handleGoHome}
        />
    );
}
