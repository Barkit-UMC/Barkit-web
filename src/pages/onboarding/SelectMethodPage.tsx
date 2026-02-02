import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanBarcode } from 'lucide-react';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

type MethodType = 'number' | 'barcode' | null;

export default function SelectMethodPage() {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState<MethodType>(null);
    const [progress, setProgress] = useState(50);

    // Animate progress on mount
    useEffect(() => {
        const timer = setTimeout(() => setProgress(100), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleNext = () => {
        if (selectedMethod === 'number') {
            navigate('/onboarding/input');
        } else if (selectedMethod === 'barcode') {
            alert('차후 개발 예정입니다.');
        }
    };

    return (
        <div className="w-[390px] h-screen mx-auto bg-white flex flex-col relative">
            <Header title="멤버십 브랜드 등록" showBackButton />

            {/* Progress Bar */}
            <div className="fixed top-[64px] left-0 right-0 h-2 bg-gray-100 z-30 mx-auto w-[390px]">
                <div
                    className="h-full bg-[#00C0E8] transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex-1 px-6 pt-[80px]">
                <p className="text-xl font-bold text-gray-900 mt-8 mb-8 whitespace-pre-wrap">
                    원하는 방법 <span className="text-[#00C0E8]">하나</span>를 선택해주세요
                </p>

                <div className="space-y-4">
                    {/* Membership Number Input Option */}
                    <button
                        onClick={() => setSelectedMethod('number')}
                        className={`w-full p-6 rounded-2xl flex items-center justify-between transition-all duration-200 border-2 ${selectedMethod === 'number'
                            ? 'bg-[#E5F9FC] border-[#00C0E8] ring-0'
                            : 'bg-gray-50 border-transparent'
                            }`}
                    >
                        <span className={`text-lg font-medium ${selectedMethod === 'number' ? 'text-[#00C0E8]' : 'text-gray-600'
                            }`}>
                            멤버십 번호 입력
                        </span>
                        {/* Styled 123 representation */}
                        <div className={`text-2xl font-mono tracking-widest ${selectedMethod === 'number' ? 'text-[#00C0E8]' : 'text-gray-300'
                            }`}>
                            123
                        </div>
                    </button>

                    {/* Barcode Photo Add Option */}
                    <button
                        onClick={() => setSelectedMethod('barcode')}
                        className={`w-full p-6 rounded-2xl flex items-center justify-between transition-all duration-200 border-2 ${selectedMethod === 'barcode'
                            ? 'bg-[#E5F9FC] border-[#00C0E8] ring-0'
                            : 'bg-gray-50 border-transparent'
                            }`}
                    >
                        <span className={`text-lg font-medium ${selectedMethod === 'barcode' ? 'text-[#00C0E8]' : 'text-gray-600'
                            }`}>
                            바코드 사진 추가
                        </span>
                        <ScanBarcode className={`w-8 h-8 ${selectedMethod === 'barcode' ? 'text-[#00C0E8]' : 'text-gray-300'
                            }`} />
                    </button>
                </div>
            </div>

            {/* Bottom Button */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <Button
                    onClick={handleNext}
                    disabled={!selectedMethod}
                    variant="cyan"
                >
                    다음
                </Button>
            </div>
        </div>
    );
}
