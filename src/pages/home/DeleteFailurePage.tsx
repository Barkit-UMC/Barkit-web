import { useNavigate } from 'react-router-dom';
import ErrorView from '../../components/common/ErrorView';

/**
 * 멤버십 삭제 실패 페이지
 * - ErrorView 공통 컴포넌트 사용
 * - 다시 시도 / 홈으로 버튼 제공
 */
export default function DeleteFailurePage() {
    const navigate = useNavigate();

    const handleRetry = () => {
        // 이전 페이지(삭제 확인 페이지)로 돌아가기
        navigate(-1);
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <ErrorView
            title={
                <>
                    아차!<br />
                    멤버십 삭제에 실패했어요.<br />
                    다시 해볼까요?
                </>
            }
            primaryButtonText="다시하기"
            onPrimaryClick={handleRetry}
            secondaryButtonText="취소"
            onSecondaryClick={handleGoHome}
        />
    );
}