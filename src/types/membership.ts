/**
 * 멤버십 데이터 구조 타입 정의
 */

export interface Membership {
    id: number;
    userId: number;
    brandId: number;
    brandName: string;
    brandLogo?: string;
    barcodeNumber: string;
    barcodeFormat: 'CODE128' | 'CODE39' | 'EAN13' | 'EAN8';
    memberName?: string;
    registeredDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface Brand {
    id: number;
    name: string;
    category: string;
    logo?: string;
    description?: string;
    website?: string;
}

export interface CreateMembershipRequest {
    brandId: number;
    barcodeNumber: string;
    barcodeFormat?: 'CODE128' | 'CODE39' | 'EAN13' | 'EAN8';
    memberName?: string;
}
