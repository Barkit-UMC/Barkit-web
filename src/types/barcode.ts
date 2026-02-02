/**
 * BarcodeDetector 타입 정의
 * 브라우저 내장 BarcodeDetector API 및 Polyfill 지원
 */

export interface DetectedBarcode {
    /** 바코드 영역의 경계 박스 */
    boundingBox: DOMRectReadOnly;
    /** 바코드 영역의 꼭지점 좌표들 */
    cornerPoints: Array<{ x: number; y: number }>;
    /** 바코드 포맷 (예: 'ean_13', 'code_128' 등) */
    format: BarcodeFormat;
    /** 스캔된 바코드 값 */
    rawValue: string;
}

export type BarcodeFormat =
    | 'aztec'
    | 'code_128'
    | 'code_39'
    | 'code_93'
    | 'codabar'
    | 'data_matrix'
    | 'ean_13'
    | 'ean_8'
    | 'itf'
    | 'pdf417'
    | 'qr_code'
    | 'upc_a'
    | 'upc_e'
    | 'unknown';

export interface BarcodeDetectorOptions {
    formats?: BarcodeFormat[];
}

export interface BarcodeDetectorInterface {
    detect(image: ImageBitmapSource): Promise<DetectedBarcode[]>;
}

declare global {
    interface Window {
        BarcodeDetector?: {
            new(options?: BarcodeDetectorOptions): BarcodeDetectorInterface;
            getSupportedFormats(): Promise<BarcodeFormat[]>;
        };
    }
}
