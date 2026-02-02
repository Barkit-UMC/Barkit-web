import { useState, useCallback } from 'react';
import { readBarcodesFromImageFile, type ReaderOptions, setZXingModuleOverrides } from 'zxing-wasm/reader';

// WASM 파일을 로컬 public 폴더에서 불러오도록 설정
// 이렇게 하면 CDN 접근이 안 되는 환경에서도 동작함
setZXingModuleOverrides({
    locateFile: (path: string, prefix: string) => {
        // public 폴더의 WASM 파일 경로 반환
        if (path.endsWith('.wasm')) {
            return `/zxing_reader.wasm`;
        }
        return prefix + path;
    }
});

interface UseBarcodesScannerResult {
    /** 스캔된 바코드 값 */
    scannedValue: string | null;
    /** 스캔 진행 중 여부 */
    isScanning: boolean;
    /** 에러 메시지 */
    error: string | null;
    /** 파일에서 바코드 스캔 함수 */
    scanFromFile: (file: File) => Promise<void>;
    /** 스캔 결과 초기화 함수 */
    reset: () => void;
}

// ZXing 리더 옵션
const READER_OPTIONS: ReaderOptions = {
    tryHarder: true,
    formats: ['Code128', 'Code39', 'EAN-13', 'EAN-8', 'UPC-A', 'UPC-E', 'QRCode'],
    maxNumberOfSymbols: 1,
};

/**
 * 바코드 스캔 커스텀 훅
 * 
 * @description
 * - ZXing-WASM 라이브러리 사용 (높은 인식률)
 * - Code 128 멤버십 바코드 우선 지원
 * - 이미지 파일에서 바코드를 감지하여 rawValue 반환
 * 
 * @example
 * const { scannedValue, isScanning, error, scanFromFile } = useBarcodeScanner();
 * 
 * // 스캔
 * await scanFromFile(imageFile);
 * 
 * // 렌더링
 * <Barcode value={scannedValue} format="CODE128" />
 */
export function useBarcodeScanner(): UseBarcodesScannerResult {
    const [scannedValue, setScannedValue] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const scanFromFile = useCallback(async (file: File) => {
        setError(null);
        setScannedValue(null);
        setIsScanning(true);

        try {
            // 파일 유효성 검사
            if (!file.type.startsWith('image/')) {
                throw new Error('이미지 파일만 업로드할 수 있습니다.');
            }

            console.log('📷 이미지 스캔 시작:', file.name, file.type, file.size, 'bytes');

            // 파일을 Blob으로 변환
            const imageBlob = new Blob([await file.arrayBuffer()], { type: file.type });

            // ZXing으로 바코드 스캔
            console.log('🔍 ZXing으로 바코드 스캔 시도 중...');
            const results = await readBarcodesFromImageFile(imageBlob, READER_OPTIONS);

            console.log('📊 ZXing 스캔 결과:', results);

            if (results.length > 0 && results[0].text) {
                const result = results[0];
                setScannedValue(result.text);
                console.log('✅ 바코드 스캔 성공:', result.text, '포맷:', result.format);
            } else {
                throw new Error('바코드를 찾을 수 없습니다. 바코드가 선명하게 보이는 이미지를 사용해주세요.');
            }
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
            setError(errorMessage);
            console.error('❌ 바코드 스캔 실패:', errorMessage);
        } finally {
            setIsScanning(false);
        }
    }, []);

    const reset = useCallback(() => {
        setScannedValue(null);
        setError(null);
        setIsScanning(false);
    }, []);

    return {
        scannedValue,
        isScanning,
        error,
        scanFromFile,
        reset
    };
}
