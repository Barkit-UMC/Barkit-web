import { useState, useCallback } from 'react';
import Quagga from '@ericblade/quagga2';

type BarcodeFormat = 'ean_13' | 'ean_8' | 'code_128' | 'code_39' | 'qr_code' | 'upc_a' | 'upc_e' | string;

interface UseBarcodesScannerResult {
    /** 스캔된 바코드 데이터 */
    scannedData: {
        rawValue: string;
        format: BarcodeFormat;
    } | null;
    /** 스캔 진행 중 여부 */
    isScanning: boolean;
    /** 에러 메시지 */
    error: string | null;
    /** 파일에서 바코드 스캔 함수 */
    scanFromFile: (file: File) => Promise<void>;
    /** 스캔 결과 초기화 함수 */
    reset: () => void;
}

// Quagga 포맷을 우리 포맷으로 변환
function convertQuaggaFormat(quaggaFormat: string): BarcodeFormat {
    const formatMap: Record<string, BarcodeFormat> = {
        'ean_reader': 'ean_13',
        'ean_8_reader': 'ean_8',
        'code_128_reader': 'code_128',
        'code_39_reader': 'code_39',
        'upc_reader': 'upc_a',
        'upc_e_reader': 'upc_e',
        'codabar_reader': 'codabar',
        'i2of5_reader': 'itf',
        'code_93_reader': 'code_93',
    };
    return formatMap[quaggaFormat] || quaggaFormat;
}

/**
 * 네이티브 BarcodeDetector API로 스캔 시도
 */
async function scanWithNativeAPI(file: File): Promise<{ rawValue: string; format: BarcodeFormat } | null> {
    // 네이티브 BarcodeDetector 지원 확인
    if (!('BarcodeDetector' in window)) {
        console.log('📱 네이티브 BarcodeDetector 미지원, Quagga fallback 사용');
        return null;
    }

    try {
        // @ts-expect-error - BarcodeDetector는 아직 TypeScript에 정식 지원 안됨
        const detector = new window.BarcodeDetector({
            formats: ['ean_13', 'ean_8', 'code_128', 'code_39', 'qr_code', 'upc_a', 'upc_e']
        });

        // 파일을 ImageBitmap으로 변환
        const imageBitmap = await createImageBitmap(file);

        // 바코드 감지
        const barcodes = await detector.detect(imageBitmap);

        if (barcodes.length > 0) {
            console.log('✅ 네이티브 API로 바코드 감지 성공');
            return {
                rawValue: barcodes[0].rawValue,
                format: barcodes[0].format
            };
        }

        console.log('⚠️ 네이티브 API에서 바코드 미감지, Quagga fallback 시도');
        return null;
    } catch (e) {
        console.warn('⚠️ 네이티브 BarcodeDetector 실패:', e);
        return null;
    }
}

/**
 * Quagga2로 스캔 (fallback)
 */
async function scanWithQuagga(file: File): Promise<{ rawValue: string; format: BarcodeFormat }> {
    // 파일을 Data URL로 변환
    const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('파일을 읽을 수 없습니다.'));
        reader.readAsDataURL(file);
    });

    console.log('🔍 Quagga2로 바코드 스캔 시도 중...');

    // 여러 patchSize로 시도 (큰 것부터 작은 것까지)
    const patchSizes: Array<'x-large' | 'large' | 'medium' | 'small'> = ['large', 'x-large', 'medium', 'small'];

    for (const patchSize of patchSizes) {
        console.log(`🔍 patchSize: ${patchSize}로 시도 중...`);

        try {
            const result = await new Promise<{ rawValue: string; format: BarcodeFormat } | null>((resolve) => {
                Quagga.decodeSingle({
                    src: dataUrl,
                    numOfWorkers: 0,
                    locate: true,
                    locator: {
                        patchSize: patchSize,
                        halfSample: false // 전체 해상도 사용
                    },
                    decoder: {
                        readers: [
                            'code_128_reader',  // Code 128 우선
                            'ean_reader',
                            'ean_8_reader',
                            'code_39_reader',
                            'code_39_vin_reader',
                            'upc_reader',
                            'upc_e_reader',
                            'codabar_reader',
                            'i2of5_reader',
                            'code_93_reader'
                        ],
                        multiple: false
                    }
                }, (scanResult) => {
                    console.log(`� patchSize ${patchSize} 결과:`, scanResult?.codeResult);

                    if (scanResult?.codeResult?.code) {
                        resolve({
                            rawValue: scanResult.codeResult.code,
                            format: convertQuaggaFormat(scanResult.codeResult.format || 'unknown')
                        });
                    } else {
                        resolve(null);
                    }
                });
            });

            if (result) {
                return result;
            }
        } catch (e) {
            console.warn(`⚠️ patchSize ${patchSize} 실패:`, e);
        }
    }

    throw new Error('바코드를 찾을 수 없습니다. 바코드가 선명하게 보이는 이미지를 사용해주세요.');
}

/**
 * 바코드 스캔 커스텀 훅
 * 
 * @description
 * - 네이티브 BarcodeDetector API 우선 사용 (Chrome, Edge 등)
 * - 미지원 브라우저에서는 Quagga2 라이브러리 fallback
 * - 이미지 파일에서 바코드를 감지하여 rawValue 반환
 */
export function useBarcodeScanner(): UseBarcodesScannerResult {
    const [scannedData, setScannedData] = useState<UseBarcodesScannerResult['scannedData']>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const scanFromFile = useCallback(async (file: File) => {
        setError(null);
        setScannedData(null);
        setIsScanning(true);

        try {
            // 파일 유효성 검사
            if (!file.type.startsWith('image/')) {
                throw new Error('이미지 파일만 업로드할 수 있습니다.');
            }

            console.log('📷 이미지 스캔 시작:', file.name, file.type, file.size, 'bytes');

            // 1. 먼저 네이티브 API 시도
            let result = await scanWithNativeAPI(file);

            // 2. 네이티브 API 실패 시 Quagga fallback
            if (!result) {
                result = await scanWithQuagga(file);
            }

            setScannedData(result);
            console.log('✅ 바코드 스캔 성공:', result.rawValue, '포맷:', result.format);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
            setError(errorMessage);
            console.error('❌ 바코드 스캔 실패:', errorMessage);
        } finally {
            setIsScanning(false);
        }
    }, []);

    const reset = useCallback(() => {
        setScannedData(null);
        setError(null);
        setIsScanning(false);
    }, []);

    return {
        scannedData,
        isScanning,
        error,
        scanFromFile,
        reset
    };
}
