import { useNavigate } from 'react-router-dom';
import SuccessView from '../../../components/common/SuccessView';

export default function BarcodeChangeCompletePage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <SuccessView
      title={
        <>
          축하합니다!<br />
          바코드 변경이 완료되었어요
        </>
      }
      buttonText="홈으로"
      onButtonClick={handleGoHome}
    />
  );
}