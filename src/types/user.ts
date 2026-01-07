/**
 * 유저 정보 타입 정의
 */

export interface User {
    id: number;
    email: string;
    name: string;
    phone?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfile extends User {
    membershipCount: number;
    favoriteStoreCount: number;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
    phone?: string;
}
