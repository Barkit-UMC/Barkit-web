import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import ChangePasswdPage from './pages/profile/ChangePasswordPage';
import ChangeBirthdayPage from './pages/profile/ChangeBirthdayPage';
import AddToHomePage from './pages/profile/AddToHomePage';
import LogoutPage from './pages/profile/LogoutPage';
import UnscribePage from './pages/profile/UnscribePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Auth pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const KakaoCallbackPage = lazy(() => import('./pages/auth/KakaoCallbackPage'));
const NaverCallbackPage = lazy(() => import('./pages/auth/NaverCallbackPage'));
// Onboarding pages
const IntroPage = lazy(() => import('./pages/onboarding/IntroPage'));
const SelectMethodPage = lazy(() => import('./pages/onboarding/SelectMethodPage'));
const SearchPage = lazy(() => import('./pages/onboarding/SearchPage'));
const InputPage = lazy(() => import('./pages/onboarding/InputPage'));
const CompletePage = lazy(() => import('./pages/onboarding/CompletePage'));
const FailurePage = lazy(() => import('./pages/onboarding/FailurePage'));
const AddBarcodePhotoPage = lazy(() => import('./pages/onboarding/AddBarcodePhotoPage'));

// Home pages
const WalletPage = lazy(() => import('./pages/home/WalletPage'));
const MembershipSearchPage = lazy(() => import('./pages/home/MembershipSearchPage'));

// Membership pages
const BrandSelectPage = lazy(() => import('./pages/membership/BrandSelectPage'));
const BrandSearchPage = lazy(() => import('./pages/membership/BrandSearchPage'));
const InputNumberPage = lazy(() => import('./pages/membership/InputNumberPage'));
const CameraScanPage = lazy(() => import('./pages/membership/CameraScanPage'));
const RegCompletePage = lazy(() => import('./pages/membership/RegCompletePage'));
const MembershipDetailPage = lazy(() => import('./pages/membership/MembershipDetailPage'));
const DeleteCompletePage = lazy(() => import('./pages/membership/delete/DeleteCompletePage'));
const DeleteFailurePage = lazy(() => import('./pages/membership/delete/DeleteFailurePage'));
const BarcodeChangeSelectMethodPage = lazy(() => import('./pages/membership/change/SelectMethodPage'));
const BarcodeChangeInputPage = lazy(() => import('./pages/membership/change/InputNumberPage'));
const BarcodeChangePhotoPage = lazy(() => import('./pages/membership/change/AddBarcodePhotoPage'));
const BarcodeChangeCompletePage = lazy(() => import('./pages/membership/change/BarcodeChangeCompletePage'));
const BarcodeChangeFailurePage = lazy(() => import('./pages/membership/change/BarcodeChangeFailurePage'));
const BenefitStorePage = lazy(() => import('./pages/membership/BenefitStorePage'));

// Map pages
const MapHomePage = lazy(() => import('./pages/map/MapHomePage'));
const MapDetailPage = lazy(() => import('./pages/map/MapDetailPage'));
const MapMembershipDetailPage = lazy(() => import('./pages/map/MapMembershipDetailPage'));

// Favorites pages
const FavoriteListPage = lazy(() => import('./pages/favorites/FavoriteListPage'));
const AddFavoritePage = lazy(() => import('./pages/favorites/AddFavoritePage'));

// Profile pages
const MyPage = lazy(() => import('./pages/profile/MyPage'));
const EditProfilePage = lazy(() => import('./pages/profile/EditProfilePage'));

// Simple loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <p className="text-lg text-gray-600">Loading...</p>
  </div>
);



const isDev = import.meta.env.MODE === 'development';
// Protected route wrapper - checks if user is authenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // TODO: Replace with actual auth check (e.g., from context or localStorage)
  if (isDev) return <>{children}</>;

  const isAuthenticated = localStorage.getItem('accessToken') !== null;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Root redirect - sends to home if authenticated, login otherwise
const RootRedirect = () => {
  // TODO: Replace with actual auth check
  if (isDev) return <Navigate to="/login" replace />;

  const isAuthenticated = localStorage.getItem('accessToken') !== null;

  return <Navigate to={isAuthenticated ? '/home' : '/login'} replace />;
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Root - redirect based on auth status */}
              <Route path="/" element={<RootRedirect />} />

              {/* Auth routes - public */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* OAuth callback routes - public */}
              <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />
              <Route path="/oauth/naver/callback" element={<NaverCallbackPage />} />

              {/* Onboarding routes - standalone (no shared layout) */}
              <Route path="/onboarding/intro" element={<IntroPage />} />
              <Route path="/onboarding/select-method" element={<SelectMethodPage />} />
              <Route path="/onboarding/search" element={<SearchPage />} />
              <Route path="/onboarding/input" element={<InputPage />} />
              <Route path="/onboarding/complete" element={<CompletePage />} />
              <Route path="/onboarding/failure" element={<FailurePage />} />
              <Route path="/onboarding/add-barcode-photo" element={<AddBarcodePhotoPage />} />

              {/* Home routes - protected */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <WalletPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <MembershipSearchPage />
                  </ProtectedRoute>
                }
              />

              {/* 멤버십 등록 - protected */}
              <Route
                path="/membership/add"
                element={
                  <ProtectedRoute>
                    <SearchPage />
                  </ProtectedRoute>
                }
              />

              {/* Membership registration routes - protected */}
              <Route
                path="/membership/new"
                element={
                  <ProtectedRoute>
                    <BrandSelectPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/search"
                element={
                  <ProtectedRoute>
                    <BrandSearchPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/input"
                element={
                  <ProtectedRoute>
                    <InputNumberPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/scan"
                element={
                  <ProtectedRoute>
                    <CameraScanPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/complete"
                element={
                  <ProtectedRoute>
                    <RegCompletePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/:id"
                element={
                  <ProtectedRoute>
                    <MembershipDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/:id/delete/complete"
                element={
                  <ProtectedRoute>
                    <DeleteCompletePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/:id/delete/failure"
                element={
                  <ProtectedRoute>
                    <DeleteFailurePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/:id/change/complete"
                element={
                  <ProtectedRoute>
                    <BarcodeChangeCompletePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/:id/change/failure"
                element={
                  <ProtectedRoute>
                    <BarcodeChangeFailurePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/:id/change/select-method"
                element={
                  <ProtectedRoute>
                    <BarcodeChangeSelectMethodPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/:id/change/input"
                element={
                  <ProtectedRoute>
                    <BarcodeChangeInputPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/:id/change/photo"
                element={
                  <ProtectedRoute>
                    <BarcodeChangePhotoPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership/:id/benefits"
                element={
                  <ProtectedRoute>
                    <BenefitStorePage />
                  </ProtectedRoute>
                }
              />

              {/* Map routes - protected */}
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapHomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map/:googleId"
                element={
                  <ProtectedRoute>
                    <MapDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map/membership/:userMembershipId"
                element={
                  <ProtectedRoute>
                    <MapMembershipDetailPage />
                  </ProtectedRoute>
                }
              />

              {/* Favorites routes - protected */}
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <FavoriteListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites/add"
                element={
                  <ProtectedRoute>
                    <AddFavoritePage />
                  </ProtectedRoute>
                }
              />

              {/* Profile routes - protected */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/pwa"
                element={
                  <ProtectedRoute>
                    <AddToHomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/edit"
                element={
                  <ProtectedRoute>
                    <EditProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/edit/password"
                element={
                  <ProtectedRoute>
                    <ChangePasswdPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/edit/birthday"
                element={
                  <ProtectedRoute>
                    <ChangeBirthdayPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/logout"
                element={
                  <ProtectedRoute>
                    <LogoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/unscribe"
                element={
                  <ProtectedRoute>
                    <UnscribePage />
                  </ProtectedRoute>
                }
              />

              {/* 404 fallback - redirect to home or login */}
              <Route path="*" element={<RootRedirect />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;