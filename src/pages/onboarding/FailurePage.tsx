import { useNavigate } from 'react-router-dom';
import ErrorView from '../../components/common/ErrorView';

export default function FailurePage() {
    const navigate = useNavigate();

    const handleStep1 = () => {
        navigate('/onboarding/search')
    }

    const handleStep2 = () => {
        navigate('/onboarding/select-method');
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
            primaryButtonText="방식 선택하기"
            onPrimaryClick={handleStep2}
            secondaryButtonText="다시하기"
            onSecondaryClick={handleStep1}
        />
    );
}
