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
    // 애니메이션이 duration-1000(1초) 동안 진행되므로,
    // 타이밍을 고려해 0.45초에 시작하면 1.45초쯤 변환이 완료됩니다.
    // 이는 페이지 이동(1.5초) 직전에 딱 맞게 끝나는 황금 타이밍입니다.
    const stepTimer = setTimeout(() => {
      setStep(1);
    }, 450);

    const navigationTimer = setTimeout(() => {
      const isAuthenticated = localStorage.getItem('accessToken') !== null;
      navigate(isAuthenticated ? '/home' : '/login', { replace: true });
    }, 1500);

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  // 공통 트랜지션 스타일: 1초 동안 부드럽게(ease-in-out) 투명도 조절
  const transitionClass = "absolute transition-opacity duration-1000 ease-in-out";

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-white overflow-hidden">

      {/* 로고 구역 */}
      <div className="relative w-70 h-35 mb-50 flex justify-center items-center">
        <img
          src={logoTxt}
          className={`${transitionClass} ${step === 0 ? 'opacity-100' : 'opacity-0'}`}
          alt="BarKit Text"
        />
        <img
          src={logoImg}
          className={`${transitionClass} ${step === 1 ? 'opacity-100' : 'opacity-0'}`}
          alt="BarKit Logo"
        />
      </div>

      {/* 하단 캐릭터 구역 */}
      <div className="absolute bottom-0 right-[-20%] w-[500px] h-[500px] pointer-events-none">
        <img
          src={chacBasic}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${step === 0 ? 'opacity-100' : 'opacity-0'}`}
          alt="Character Basic"
        />
        <img
          src={chacCong}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${step === 1 ? 'opacity-100' : 'opacity-0'}`}
          alt="Character Action"
        />
      </div>
    </div>
  );
}