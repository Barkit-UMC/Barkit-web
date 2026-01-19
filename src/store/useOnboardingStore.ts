// src/store/useOnboardingStore.ts
import { create } from 'zustand';

interface Brand {
    id: number;
    name: string;
    icon: string;
    color: string;
}

interface OnboardingState {
    selectedBrand: Brand | null;
    cardNumber: string;
    setBrand: (brand: Brand | null) => void;
    setCardNumber: (number: string) => void;
    reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    selectedBrand: null,
    cardNumber: '',
    setBrand: (brand) => set({ selectedBrand: brand }),
    setCardNumber: (number) => set({ cardNumber: number }),
    reset: () => set({ selectedBrand: null, cardNumber: '' }),
}));
