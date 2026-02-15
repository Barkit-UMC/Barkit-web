import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoTxt from '../../assets/icons/splash/logo_txt.svg';
import logoImg from '../../assets/icons/splash/logo_img.svg';
import chacBasic from '../../assets/icons/splash/chac_basic.svg';
import chacCong from '../../assets/icons/splash/chac_cong.svg';

export default function SplashPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 0.45초 후 step 1로 전환 (애니메이션 속도 0.7s에 맞춰 앞당김)
    const stepTimer = setTimeout(() => {
      setStep(1);
    }, 450);

    // 총 1.5초 후 페이지 이동
    const navigationTimer = setTimeout(() => {
      const isAuthenticated = localStorage.getItem('accessToken') !== null;
      navigate(isAuthenticated ? '/home' : '/login', { replace: true });
    }, 1500);

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-white overflow-hidden">

      {/* 로고 구역 */}
      <div className="relative w-70 h-35 mb-50 flex justify-center items-center">
        <img
          src={logoTxt}
          className={`absolute transition-opacity duration-300 ${step === 0 ? 'opacity-100' : 'opacity-0'}`}
          alt="BarKit Text"
        />
        <img
          src={logoImg}
          className={`absolute transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}
          alt="BarKit Logo"
        />
      </div>

      {/* 하단 캐릭터 구역: 오른쪽 하단 배치 */}
      <div className="absolute bottom-0 right-[-20%] w-[500px] h-[500px] pointer-events-none">
        <img
          src={chacBasic}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${step === 0 ? 'opacity-100' : 'opacity-0'}`}
          alt="Character Basic"
        />
        <img
          src={chacCong}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}
          alt="Character Action"
        />
      </div>
    </div>
  );
}
