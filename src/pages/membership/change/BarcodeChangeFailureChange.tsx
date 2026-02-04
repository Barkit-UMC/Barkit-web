import { useNavigate, useParams } from 'react-router-dom';
import ErrorView from '../../../components/common/ErrorView';

export default function BarcodeChangeFailurePage() {
    const handleSelectMethod = () => {
        // TODO: 추후 방법 선택 페이지로 이동
    };

    const handleRetry = () => {
        // TODO: 추후 재시도 페이지로 이동
    };

    return (
        <ErrorView
            title={
                <>
                    아차!<br />
                    바코드 변경에 실패했어요<br />
                    다시 해볼까요?
                </>
            }
            primaryButtonText="방법 선택하기"
            onPrimaryClick={handleSelectMethod}
            secondaryButtonText="다시하기"
            onSecondaryClick={handleRetry}
        />
    );
}