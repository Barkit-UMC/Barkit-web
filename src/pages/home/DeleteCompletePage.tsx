import { useNavigate } from 'react-router-dom';
import SuccessView from '../../components/common/SuccessView';

/**
 * 멤버십 삭제 완료 페이지
 * - SuccessView 공통 컴포넌트 사용
 * - 버튼 클릭 시 홈으로 이동
 */
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
          멤버십 삭제가 완료되었어요.
        </>
      }
      buttonText="홈으로"
      onButtonClick={handleGoHome}
    />
  );
}