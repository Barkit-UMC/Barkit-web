export default function LoadingDots() {
    return (
        <div className="flex items-center justify-center gap-[21px]">
            <div className="w-[14px] h-[14px] rounded-full dot-1" />
            <div className="w-[14px] h-[14px] rounded-full dot-2" />
            <div className="w-[14px] h-[14px] rounded-full dot-3" />
            
            <style>{`
                @keyframes blink-dot {
                    0%, 33% { background-color: #e5e7eb; }
                    34%, 66% { background-color: #f3f4f6; }
                    67%, 100% { background-color: #e5e7eb; }
                }
                .dot-1 { 
                    animation: blink-dot 1.5s ease-in-out infinite;
                }
                .dot-2 { 
                    animation: blink-dot 1.5s ease-in-out infinite 0.5s;
                }
                .dot-3 { 
                    animation: blink-dot 1.5s ease-in-out infinite 1s;
                }
            `}</style>
        </div>
    );
}