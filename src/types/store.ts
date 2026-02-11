/**
 * Store 타입 정의
 * - 백엔드 API에서 내려주는 가맹점 데이터 구조 기준
 */
export interface Store {
  storeId: number;       // 매장 고유 ID
  brandName: string;     // 매장 이름 (검색용)
  storeImageUrl: string; // 아이콘 또는 이미지 URL
}
