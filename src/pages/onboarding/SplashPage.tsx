import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashPage() {
  const navigate = useNavigate();
  const [logoIndex, setLogoIndex] = useState(0);

  useEffect(() => {
    // 로고 및 캐릭터 동시 전환 (0.8초마다)
    const logoTimer = setInterval(() => {
      setLogoIndex((prev) => (prev === 0 ? 1 : 0));
    }, 800);

    const navigationTimer = setTimeout(() => {
      const isAuthenticated = localStorage.getItem('accessToken') !== null;
      navigate(isAuthenticated ? '/home' : '/login', { replace: true });
    }, 3000);

    return () => {
      clearInterval(logoTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-white overflow-hidden">
      
      {/* 로고 구역: opacity를 이용해 부드럽게 교차 */}
      <div className="relative w-40 h-20 flex justify-center items-center">
        <img 
          src="/src/assets/icons/splash/logo_txt.svg" 
          className={`absolute transition-opacity duration-500 ${logoIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
          alt="BarKit Text" 
        />
        <img 
          src="/src/assets/icons/splash/logo_img.svg" 
          className={`absolute transition-opacity duration-500 ${logoIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
          alt="BarKit Logo" 
        />
      </div>

      {/* 하단 캐릭터 구역: 오른쪽 하단 배치 */}
      <div className="absolute bottom-[-5%] right-[-10%] w-[300px] h-[300px]">
        <img 
          src="/src/assets/icons/splash/chac_basic.svg" 
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${logoIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
          alt="Character Basic" 
        />
        <img 
          src="/src/assets/icons/splash/chac_cong.svg" 
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${logoIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
          alt="Character Action" 
        />
      </div>
    </div>
  );
}