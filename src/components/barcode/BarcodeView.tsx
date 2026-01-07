import React, { useEffect, useRef } from 'react';

interface BarcodeViewProps {
    value: string;
    format?: 'CODE128' | 'CODE39' | 'EAN13' | 'EAN8';
    width?: number;
    height?: number;
}

/**
 * [PAGE 10] 바코드 생성/렌더링 컴포넌트
 * 실제 바코드를 생성하고 표시하는 컴포넌트
 * TODO: JsBarcode 라이브러리 통합 필요
 */
export default function BarcodeView({
    value,
    format = 'CODE128',
    width = 2,
    height = 100
}: BarcodeViewProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // TODO: JsBarcode 라이브러리를 사용하여 실제 바코드 생성
        // import JsBarcode from 'jsbarcode';
        // if (canvasRef.current) {
        //   JsBarcode(canvasRef.current, value, {
        //     format,
        //     width,
        //     height,
        //     displayValue: true
        //   });
        // }
    }, [value, format, width, height]);

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white">
            <canvas ref={canvasRef} className="mb-4" />
            <div className="text-center">
                <p className="text-2xl font-mono font-semibold tracking-wider">{value}</p>
                <p className="text-xs text-gray-500 mt-2">바코드 번호</p>
            </div>
        </div>
    );
}
