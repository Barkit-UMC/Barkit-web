import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ErrorView from '../../../components/common/ErrorView';

type ChangeMethod = 'number' | 'barcode';

export default function BarcodeChangeFailurePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    // 이전 페이지에서 전달받은 변경 방법
    const changeMethod = location.state?.changeMethod as ChangeMethod;

    const handleSelectMethod = () => {
        navigate(`/membership/${id}/change/select-method`);
    };

    const handleRetry = () => {
        if (changeMethod === 'number') {
            navigate(`/membership/${id}/change/input`);
        } else if (changeMethod === 'barcode') {
            navigate(`/membership/${id}/change/photo`);
        } else {
            navigate(-1);
        }
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