import { useNavigate, useParams } from 'react-router-dom';
import ErrorView from '../../components/common/ErrorView';

export default function DeleteFailurePage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const handleRetry = () => {
        navigate(`/membership/${id}`)
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
            primaryButtonText="취소"
            onPrimaryClick={handleGoHome}
            secondaryButtonText="다시하기"
            onSecondaryClick={handleRetry}
        />
    );
}