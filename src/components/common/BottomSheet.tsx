import React, { useEffect, useState, useRef } from 'react';

interface SortOption {
  id: string;
  label: string;
  icon: string;
}

interface SortModalProps {
  options: SortOption[];
  selectedValue: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const SortBottomSheet = ({
  options,
  selectedValue,
  onSelect,
  onClose,
}: SortModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const isClosingRef = useRef(false);

  useEffect(() => {
    setIsVisible(true);

    raf1Ref.current = requestAnimationFrame(() => {
      raf2Ref.current = requestAnimationFrame(() => {
        setIsAnimatingOpen(true);
      });
    });

    return () => {
      if (raf1Ref.current !== null) cancelAnimationFrame(raf1Ref.current);
      if (raf2Ref.current !== null) cancelAnimationFrame(raf2Ref.current);
      if (closeTimeoutRef.current !== null)
        clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    setIsAnimatingOpen(false);

    closeTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[99999]">
      {/* overlay */}
      <div
        className={`
          absolute inset-0 bg-black
          transition-opacity duration-300
          ${isAnimatingOpen ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={handleClose}
      />

      {/* bottom sheet */}
      <div
        className={`
          absolute bottom-0 left-1/2 -translate-x-1/2 w-full
          bg-white rounded-t-[32px] pt-8 pb-10 px-6 shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isAnimatingOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
        style={{
          paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom))',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col mb-6">
          {options.map((option) => {
            const isSelected = selectedValue === option.id;

            return (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option.id);
                  handleClose();
                }}
                className="w-full flex items-center gap-4 py-4 transition-all active:bg-gray-50 rounded-xl px-2"
              >
                <img
                  src={option.icon}
                  alt={option.label}
                  className={`w-6 h-6 transition-all ${
                    isSelected ? 'opacity-100' : 'grayscale opacity-30'
                  }`}
                  style={
                    isSelected
                      ? { filter: 'drop-shadow(0px 0px 1px #00C0E8)' }
                      : {}
                  }
                />

                <span
                  className={`text-[18px] font-medium tracking-tight transition-colors ${
                    isSelected ? 'text-[#00C0E8]' : 'text-gray-400'
                  }`}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleClose}
          className="w-full bg-cyan-50 py-4 rounded-2xl text-[#00C0E8] text-[16px] font-medium active:scale-[0.98] transition-all"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default SortBottomSheet;
