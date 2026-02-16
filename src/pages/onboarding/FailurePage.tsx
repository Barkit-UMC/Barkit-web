import { useNavigate } from 'react-router-dom';
import ErrorView from '../../components/common/ErrorView';

export default function FailurePage() {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate('/onboarding/search');
    };

    const handleCancel = () => {
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
            primaryButtonText="취소"
            onPrimaryClick={handleCancel}
            secondaryButtonText="다시하기"
            onSecondaryClick={handleRetry}
        />
    );
}
