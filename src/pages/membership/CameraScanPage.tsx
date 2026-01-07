import React, { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

/**
 * [PAGE 7] 카메라(OCR) 촬영 페이지
 */
export default function CameraScanPage() {
    const navigate = useNavigate();
    const { brandId } = useParams();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // TODO: 카메라 권한 요청 및 스트림 시작
        startCamera();

        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Camera access denied:', error);
            alert('카메라 접근 권한이 필요합니다.');
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleCapture = () => {
        // TODO: OCR 처리 및 바코드 인식
        console.log('Capture and process barcode');
        // 임시로 등록 완료 페이지로 이동
        navigate('/membership/complete');
    };

    return (
        <Layout>
            <Header title="바코드 스캔" />
            <div className="relative h-[calc(100vh-64px)] bg-black">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                />

                {/* 스캔 가이드 오버레이 */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        <div className="w-64 h-32 border-4 border-white rounded-lg opacity-50"></div>
                        <p className="text-white text-center mt-4">
                            바코드를 프레임 안에 맞춰주세요
                        </p>
                    </div>
                </div>

                {/* 촬영 버튼 */}
                <div className="absolute bottom-8 left-0 right-0 px-6">
                    <Button onClick={handleCapture}>촬영하기</Button>
                </div>
            </div>
        </Layout>
    );
}
