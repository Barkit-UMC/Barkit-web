import { useState, useEffect, useRef } from 'react';

interface CameraOptions {
    facingMode?: 'user' | 'environment';
}

/**
 * 카메라 권한 및 촬영 로직을 관리하는 커스텀 훅
 */
export function useCamera(options: CameraOptions = {}) {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isActive, setIsActive] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: options.facingMode || 'environment' }
            });
            setStream(mediaStream);
            setIsActive(true);
            setError(null);

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            setError('카메라 접근 권한이 필요합니다.');
            console.error('Camera access error:', err);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setIsActive(false);
        }
    };

    const captureImage = (): string | null => {
        if (!videoRef.current) return null;

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0);
            return canvas.toDataURL('image/jpeg');
        }

        return null;
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return {
        videoRef,
        stream,
        error,
        isActive,
        startCamera,
        stopCamera,
        captureImage
    };
}
