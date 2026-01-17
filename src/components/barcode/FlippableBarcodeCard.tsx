import React, { useState } from 'react';
import barcode from '../../assets/images/barcodes/barcode.svg'

interface FlippableBarcodeCardProps {
    brandName: string;
    brandLogo?: string;
    points: number;
    color: string;
    onClick?: () => void;
}

export default function FlippableBarcodeCard({
    brandName,
    brandLogo,
    points,
    color,
    onClick,
}: FlippableBarcodeCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
        onClick?.();
    };

    const renderLogo = () => (
        <div className="absolute top-5 right-5 w-[34.59px] h-[34.59px] flex items-center justify-center">
            {brandLogo ? (
                <img 
                    src={brandLogo} 
                    alt="brand logo" 
                    className="w-full h-full object-contain" 
                />
            ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg" />
            )}
        </div>
    );

    return (
        <div
            onClick={handleClick}
            className={`${color} rounded-2xl p-5 cursor-pointer relative overflow-hidden w-[344px] h-[211.08px]`}
        >
            {/* 앞면 */}
            {!isFlipped && (
                <>
                    <div className="absolute top-5 left-5">
                        <h3 className="text-white text-2xl font-bold">
                            {brandName}
                        </h3>
                    </div>
                    {renderLogo()}
                </>
            )}

            {/* 뒷면 */}
            {isFlipped && (
                <>
                    <div className="absolute top-5 left-5">
                        <p className="text-white text-2xl font-bold">{points.toLocaleString()} P</p>
                    </div>
                    {renderLogo()}

                    <div className="flex justify-center mt-12">
                        <img src={barcode} alt="barcode" className="w-[253px] h-[134.67px] object-contain" />
                    </div>
                </>
            )}
        </div>
    );
}