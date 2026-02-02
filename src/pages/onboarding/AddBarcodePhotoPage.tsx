import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Camera, Loader2 } from 'lucide-react';
import Barcode from 'react-barcode';
import Header from '../../components/common/Header';
import { useBarcodeScanner } from '../../hooks/useBarcodeScanner';

type StepType = 'initial' | 'preview';

export default function AddBarcodePhotoPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState<StepType>('initial');
    const [showActionSheet, setShowActionSheet] = useState(true);

    // 바코드 스캐너 훅
    const { scannedValue, isScanning, error, scanFromFile, reset } = useBarcodeScanner();

    // 파일 input ref
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    // 파일 선택 처리
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setShowActionSheet(false);
            await scanFromFile(file);
            setStep('preview');
        }
        // input 초기화 (같은 파일 다시 선택 가능하도록)
        e.target.value = '';
    };

    // 사진에서 불러오기
    const handleSelectFromGallery = () => {
        fileInputRef.current?.click();
    };

    // 직접 촬영하기
    const handleTakePhoto = () => {
        cameraInputRef.current?.click();
    };

    // 취소 버튼
    const handleCancel = () => {
        setShowActionSheet(false);
        navigate(-1);
    };

    // 다시하기 버튼
    const handleRetry = () => {
        reset();
        setStep('initial');
        setShowActionSheet(true);
    };

    // 완료하기 버튼
    const handleComplete = () => {
        // TODO: scannedValue를 서버에 저장하거나 다음 페이지로 전달
        navigate('/onboarding/complete');
    };

    return (
        <div className="flex h-full mx-auto bg-[#f5f5f5] flex flex-col relative">
            <Header title="바코드 사진 추가" showBackButton />

            {/* Hidden File Inputs */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Main Content Area */}
            <div className="flex-1 px-6 pt-[80px] pb-[200px]">
                {/* Barcode Preview Area */}
                <div className="mt-4">
                    {step === 'initial' ? (
                        /* 초기 상태: 빈 플레이스홀더 박스 */
                        <div className="w-full aspect-[4/3] bg-white rounded-2xl shadow-sm flex items-center justify-center">
                            <div className="w-full h-full bg-gray-200 rounded-2xl" />
                        </div>
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

                {/* 정보 영역 */}
                <div className="mt-8 space-y-4">
                    {/* 브랜드 */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <span className="text-base font-semibold text-gray-900">브랜드</span>
                        <span className="text-base text-gray-600">CJ ONE</span>
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
                        disabled={!scannedValue || isScanning}
                        className="w-full py-4 rounded-full bg-[#00C7E2] text-white font-semibold text-base shadow-lg transition-all hover:bg-[#00B7D2] active:scale-[0.98] disabled:bg-gray-300 disabled:shadow-none"
                    >
                        완료하기
                    </button>
                </div>
            )}

            {/* 초기 상태: 바텀 시트 (Action Sheet) */}
            {showActionSheet && step === 'initial' && (
                <>
                    {/* Dimmed Overlay */}
                    <div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={handleCancel}
                    />

                    {/* Action Sheet Container - 중앙 정렬용 */}
                    <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
                        {/* Action Sheet Panel */}
                        <div className="w-[390px] bg-white rounded-t-3xl pointer-events-auto animate-slide-up-simple">
                            <div className="p-6">
                                {/* 메뉴 옵션들 */}
                                <div className="space-y-1">
                                    {/* 사진에서 불러오기 */}
                                    <button
                                        onClick={handleSelectFromGallery}
                                        className="w-full flex items-center gap-4 py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        <Image className="w-6 h-6 text-gray-600" />
                                        <span className="text-base font-medium text-gray-900">
                                            사진에서 불러오기
                                        </span>
                                    </button>

                                    {/* 직접 촬영하기 */}
                                    <button
                                        onClick={handleTakePhoto}
                                        className="w-full flex items-center gap-4 py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        <Camera className="w-6 h-6 text-gray-600" />
                                        <span className="text-base font-medium text-gray-900">
                                            직접 촬영하기
                                        </span>
                                    </button>
                                </div>

                                {/* 취소 버튼 */}
                                <div className="mt-4">
                                    <button
                                        onClick={handleCancel}
                                        className="w-full py-4 rounded-full bg-[#E0F7FA] text-[#00C7E2] font-semibold text-base transition-all hover:bg-[#B2EBF2] active:scale-[0.98]"
                                    >
                                        취소
                                    </button>
                                </div>
                            </div>

                            {/* Home Indicator (iOS style) */}
                            <div className="flex justify-center pb-4">
                                <div className="w-32 h-1 bg-gray-300 rounded-full" />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
