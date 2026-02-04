import { useNavigate } from 'react-router-dom';
import SuccessView from '../../../components/common/SuccessView';

export default function DeleteCompletePage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <SuccessView
      title={
        <>
          완료!<br />
          멤버십 삭제가 완료되었어요
        </>
      }
      buttonText="홈으로"
      onButtonClick={handleGoHome}
    />
  );
}