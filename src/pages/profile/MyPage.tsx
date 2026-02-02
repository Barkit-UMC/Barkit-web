import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import ToggleSwitch from '../../components/profile/ToggleSwitch';
import CommonToast from '../../components/profile/CommonToast';
import Header from '../../components/common/Header';

/**
 * [PAGE 20] 마이페이지 메인
 */
export default function MyPage() {
  const navigate = useNavigate();

  // TODO: API에서 사용자 정보 가져오기
  const user = {
    name: '홍길동',
    email: 'hong@example.com',
    membershipCount: 3
  };

  const menuItems = [
    { id: 'pwa', label: '홈 화면에 추가 (PWA)', path: '/profile/pwa' },
    { id: 'edit', label: '개인정보 변경', path: '/profile/edit' },
    { id: 'locationpermission', label: '위치 권한 요청', type: 'toggle' },
    { id: 'notification', label: '알림 설정', type: 'toggle' },
    { id: 'logout', label: '로그아웃', path: '/profile/logout' },
    { id: 'unsubscribe', label: '회원탈퇴', path: '/profile/unscribe' }
  ];

  // 토글 상태
  const [isNotiOn, setIsNotiOn] = useState(false);
  const [isLocationOn, setLocationOn] = useState(false);

  // 토스트 상태 (보일 때만 값 존재)
  const [toast, setToast] = useState<{
    type: 'notification' | 'location' ;
    status: 'on' | 'off';
  } | null>(null);

  // 토스트 보여주고 자동으로 닫기
  const showToast = (
    type: 'notification' | 'location',
    status: 'on' | 'off'
  ) => {
    setToast({ type, status });
  };

  return (
    <Layout showBottomNav>
      <Header title="프로필" showBackButton={false}  />

<main className="flex-1 pt-[60px] overflow-y-auto scrollbar-hide pb-20">
      {/* 메뉴 리스트 */}
      <div className="mt-20">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.path) {
                navigate(item.path);
              }
            }}
            className="
              w-full h-18
              bg-white
              flex items-center justify-between
              px-[25px]
            "
          >
            {/* 왼쪽 텍스트 */}
            <span className="text-[20px] font-semibold">
              {item.label}
            </span>

            {/* 토글 */}
            {item.type === 'toggle' && (
              <ToggleSwitch
                isOn={
                  item.id === 'notification'
                    ? isNotiOn
                    : isLocationOn
                }
                onToggle={() => {
                  if (item.id === 'notification') {
                    setIsNotiOn((prev) => {
                      const next = !prev;
                      showToast('notification', next ? 'on' : 'off');
                      return next;
                    });
                  }

                  if (item.id === 'locationpermission') {
                    setLocationOn((prev) => {
                      const next = !prev;
                      showToast('location', next ? 'on' : 'off');
                      return next;
                    });
                  }
                }}
              />
            )}
          </button>
        ))}
      </div>
      </main>

      {/* 토스트 조건부 렌더링 */}
      {toast && (
        <CommonToast
          type={toast.type}
          status={toast.status}
          onClose={() => setToast(null)}
        />
      )}
    </Layout>
  );
}