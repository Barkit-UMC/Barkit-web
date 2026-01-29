import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import BarcodeView from '../../components/barcode/BarcodeView';

export default function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // TODO: API에서 멤버십 상세 정보 가져오기
    const membership = {
        id: 1,
        brandName: '스타벅스',
        barcodeNumber: '1234567890123',
        barcodeFormat: 'CODE128' as const,
        memberName: '홍길동',
        registeredDate: '2024-01-01'
    };

    const handleDelete = () => {
        if (confirm('이 멤버십을 삭제하시겠습니까?')) {
            // TODO: 삭제 API 호출
            console.log('Delete membership:', id);
            navigate('/wallet');
        }
    };

    return (
        <Layout>
            <Header
                title={membership.brandName}
                rightAction={
                    <button
                        onClick={handleDelete}
                        className="text-red-500 hover:text-red-700"
                    >
                        삭제
                    </button>
                }
            />

            <div className="p-6">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">{membership.brandName}</h2>
                        <p className="text-blue-100">{membership.memberName}</p>
                    </div>

                    <div className="p-6">
                        <BarcodeView
                            value={membership.barcodeNumber}
                            format={membership.barcodeFormat}
                        />
                    </div>

                    <div className="px-6 pb-6 space-y-3 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span>등록일</span>
                            <span>{membership.registeredDate}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 text-center">
                        💡 화면 밝기를 최대로 올려서 사용하세요
                    </p>
                </div>
            </div>
        </Layout>
    );
}
