import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useMembershipRegister } from '../../hooks/useMembershipRegister';

/**
 * [PAGE 6] 번호 입력 페이지
 */
export default function InputNumberPage() {
    const navigate = useNavigate();
    const { brandId } = useParams();
    const [barcodeNumber, setBarcodeNumber] = useState('');

    // 멤버십 등록 훅
    const { register, isLoading, error } = useMembershipRegister({
        onSuccess: () => navigate('/membership/complete'),
    });

    const handleSubmit = async () => {
        if (!brandId || !barcodeNumber) return;
        await register(Number(brandId), barcodeNumber);
    };

    const handleScanBarcode = () => {
        navigate(`/membership/camera/${brandId}`);
    };

    return (
        <Layout>
            <Header title="멤버십 번호 입력" />
            <div className="p-6 flex flex-col min-h-[calc(100vh-64px)]">
                <div className="flex-1">
                    <p className="text-gray-600 mb-6">
                        멤버십 카드에 있는 바코드 번호를 입력하세요
                    </p>

                    {/* 에러 메시지 */}
                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
                            {error}
                        </div>
                    )}

                    <Input
                        type="text"
                        placeholder="바코드 번호 입력"
                        value={barcodeNumber}
                        onChange={setBarcodeNumber}
                        label="바코드 번호"
                    />

                    <button
                        onClick={handleScanBarcode}
                        className="w-full mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>카메라로 스캔하기</span>
                        </div>
                    </button>
                </div>

                <div className="px-6 pb-8">
                    <Button
                        onClick={handleSubmit}
                        disabled={!barcodeNumber}
                        isLoading={isLoading}
                        loadingText="등록 중..."
                    >
                        등록하기
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
