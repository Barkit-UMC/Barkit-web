import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import iconSearch from '../../assets/icons/search/search.svg';
import MembershipSearchBar from '../../components/common/MembershipSearchBar';
import FlippableBarcodeCard from '../../components/barcode/FlippableBarcodeCard';
import iconKt from '../../assets/icons/stores/kt.svg';

export default function BarcodeListPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // 멤버십 (임시)
    const memberships = [
        { 
            id: 1, 
            brandName: '브랜드명',
            brandLogo: undefined,
            points: 5000,
            color: 'bg-gradient-to-br from-purple-600 to-purple-700',
        },
        { 
            id: 2, 
            brandName: 'KT', 
            brandLogo: iconKt,
            points: 6000,
            color: 'bg-gradient-to-br from-teal-300 to-teal-400',
        },
        { 
            id: 3, 
            brandName: '브랜드명',
            brandLogo: undefined,
            points: 3000,
            color: 'bg-gradient-to-br from-red-400 to-red-500',
        },
        { 
            id: 4, 
            brandName: '브랜드명',
            brandLogo: undefined,
            points: 8000,
            color: 'bg-gradient-to-br from-orange-400 to-orange-500',
        },
    ];

    const filteredMemberships = memberships.filter(membership =>
        membership.brandName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout showBottomNav>
            <div className="bg-[#F9F9F9] min-h-screen">
                {/* 헤더 */}
                <Header title="나의 바코드" />

                {/* 검색창 */}
                <div className="mt-8 mb-2">
                    <MembershipSearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        iconSearch={iconSearch}
                    />
                </div>

                {/* 카드 리스트 */}
                <div className="px-4 pt-6 space-y-5 flex flex-col items-center">
                    {filteredMemberships.length > 0 ? (
                        filteredMemberships.map((membership) => (
                            <DraggableCard
                                key={membership.id}
                                membershipId={membership.id}
                                onDragComplete={() => navigate(`/barcode/${membership.id}`)}
                            >
                                <FlippableBarcodeCard
                                    brandName={membership.brandName}
                                    brandLogo={membership.brandLogo}
                                    points={membership.points}
                                    color={membership.color}
                                />
                            </DraggableCard>
                        ))
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            검색 결과가 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

// 드래그 가능한 카드 컴포넌트
interface DraggableCardProps {
    membershipId: number;
    children: React.ReactNode;
    onDragComplete: () => void;
}

function DraggableCard({ children, onDragComplete }: DraggableCardProps) {
    const [dragOffset, setDragOffset] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);

    const dragThreshold = -100; // 왼쪽으로 100px 드래그하면 페이지 이동

    // 터치 이벤트
    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const offset = currentX - startX;
        
        // 왼쪽으로만 드래그 가능
        if (offset < 0) {
            setDragOffset(offset);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        
        if (dragOffset < dragThreshold) {
            // 임계값을 넘으면 페이지 이동
            onDragComplete();
        } else {
            // 원위치로 복귀
            setDragOffset(0);
        }
    };

    // 마우스 이벤트 (데스크톱 테스트용)
    const handleMouseDown = (e: React.MouseEvent) => {
        setStartX(e.clientX);
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const offset = e.clientX - startX;
        
        if (offset < 0) {
            setDragOffset(offset);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        
        if (dragOffset < dragThreshold) {
            onDragComplete();
        } else {
            setDragOffset(0);
        }
    };

    return (
        <div
            className="w-[344px] h-[211.08px] touch-pan-y"
            style={{
                transform: `translateX(${dragOffset}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
                if (isDragging) {
                    setIsDragging(false);
                    setDragOffset(0);
                }
            }}
        >
            {children}
        </div>
    );
}