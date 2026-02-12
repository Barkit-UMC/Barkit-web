import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Barcode from 'react-barcode';
import Header from '../../components/common/Header';
import { useBarcodeScanner } from '../../hooks/useBarcodeScanner';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { useMembershipRegister } from '../../hooks/useMembershipRegister';

type StepType = 'initial' | 'preview';

export default function AddBarcodePhotoPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState<StepType>('initial');
    const { selectedBrand } = useOnboardingStore();

    // 바코드 스캐너 훅
    const { scannedValue, isScanning, error, scanFromFile, reset } = useBarcodeScanner();

    // 멤버십 등록 훅
    const { register, isLoading: isRegistering, error: registerError } = useMembershipRegister({
        onSuccess: () => navigate('/onboarding/complete'),
        onError: () => navigate('/onboarding/failure'),
    });

    // 파일 input ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 페이지 마운트 시 바로 파일 선택 다이얼로그 열기
    useEffect(() => {
        // 약간의 딜레이 후 파일 선택 다이얼로그 열기
        const timer = setTimeout(() => {
            fileInputRef.current?.click();
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // 파일 선택 처리
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await scanFromFile(file);
            setStep('preview');
        } else {
            // 파일 선택을 취소한 경우 이전 페이지로 이동
            if (step === 'initial') {
                navigate(-1);
            }
        }
        // input 초기화 (같은 파일 다시 선택 가능하도록)
        e.target.value = '';
    };

    // 사진 추가하기 버튼 (초기 화면에서)
    const handleAddPhoto = () => {
        fileInputRef.current?.click();
    };

    // 다시하기 버튼
    const handleRetry = () => {
        reset();
        setStep('initial');
        // 다시하기 시에도 바로 파일 선택
        setTimeout(() => {
            fileInputRef.current?.click();
        }, 100);
    };

    // 완료하기 버튼
    const handleComplete = async () => {
        if (!scannedValue || !selectedBrand) return;
        await register(selectedBrand.id, scannedValue);
    };

    return (
        <div className="h-full mx-auto bg-[#f5f5f5] flex flex-col relative">
            <Header title="바코드 사진 추가" showBackButton />

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Main Content Area */}
            <div className="flex-1 px-6 pt-[80px] pb-[200px]">
                {/* Barcode Preview Area */}
                <div className="mt-4">
                    {step === 'initial' ? (
                        /* 초기 상태: 사진 추가 안내 */
                        <button
                            onClick={handleAddPhoto}
                            className="w-full aspect-[4/3] bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#E0F7FA] flex items-center justify-center">
                                <svg className="w-8 h-8 text-[#00C7E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <span className="text-base text-gray-500">탭하여 사진 추가</span>
                        </button>
                    ) : (
                        /* 완료 상태: 바코드 이미지가 표시된 카드 */
                        <div className="w-full bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center min-h-[180px]">
                            {isScanning ? (
                                /* 스캔 중 로딩 */
                                <div className="flex flex-col items-center gap-3">
                                    <Loader2 className="w-10 h-10 text-[#00C7E2] animate-spin" />
                                    <span className="text-gray-500 text-sm">바코드 스캔 중...</span>
                                </div>
                            ) : error ? (
                                /* 에러 상태 */
                                <div className="flex flex-col items-center gap-3 text-center">
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                        <span className="text-red-500 text-2xl">!</span>
                                    </div>
                                    <span className="text-red-500 text-sm">{error}</span>
                                </div>
                            ) : scannedValue ? (
                                /* 스캔 성공: react-barcode로 바코드 렌더링 */
                                <Barcode
                                    value={scannedValue}
                                    format="CODE128"
                                    width={2}
                                    height={80}
                                    displayValue={false}
                                    background="#ffffff"
                                    lineColor="#000000"
                                />
                            ) : null}
                        </div>
                    )}
                </div>

                {/* 등록 에러 메시지 */}
                {registerError && (
                    <div className="mt-4 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                        {registerError}
                    </div>
                )}

                {/* 정보 영역 */}
                <div className="mt-8 space-y-4">
                    {/* 브랜드 */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <span className="text-base font-semibold text-gray-900">브랜드</span>
                        <span className="text-base text-gray-600">{selectedBrand?.name ?? '—'}</span>
                    </div>

                    {/* 멤버십 번호 */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <span className="text-base font-semibold text-gray-900">멤버십 번호</span>
                        {step === 'preview' && scannedValue ? (
                            <span className="text-base text-[#00C7E2] font-medium">
                                {scannedValue}
                            </span>
                        ) : step === 'preview' ? (
                            <span className="text-base text-gray-400">수동 입력 필요</span>
                        ) : (
                            <span className="text-base text-gray-400"></span>
                        )}
                    </div>
                </div>
            </div>

            {/* 완료 상태: 하단 고정 버튼 */}
            {step === 'preview' && (
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white p-6 space-y-3">
                    {/* 다시하기 버튼 */}
                    <button
                        onClick={handleRetry}
                        className="w-full py-4 rounded-full bg-[#E0F7FA] text-[#00C7E2] font-semibold text-base transition-all hover:bg-[#B2EBF2] active:scale-[0.98]"
                    >
                        다시하기
                    </button>

                    {/* 완료하기 버튼 */}
                    <button
                        onClick={handleComplete}
                        disabled={!scannedValue || isScanning || isRegistering || !selectedBrand}
                        className="w-full py-4 rounded-full bg-[#00C7E2] text-white font-semibold text-base shadow-lg transition-all hover:bg-[#00B7D2] active:scale-[0.98] disabled:bg-gray-300 disabled:shadow-none"
                    >
                        {isRegistering ? '등록 중...' : '완료하기'}
                    </button>
                </div>
            )}
        </div>
    );
}
