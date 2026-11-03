import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import VenueImage from '../assets/images/venueg.jpg';

const galleryImages = [
  { id: 1, url: VenueImage, alt: 'Wedding photo 1' },
  { id: 2, url: VenueImage, alt: 'Wedding photo 2' },
  { id: 3, url: VenueImage, alt: 'Wedding photo 3' },
  { id: 4, url: VenueImage, alt: 'Wedding photo 4' },
  { id: 5, url: VenueImage, alt: 'Wedding photo 5' },
  { id: 6, url: VenueImage, alt: 'Wedding photo 6' },
  { id: 7, url: VenueImage, alt: 'Wedding photo 7' },
  { id: 8, url: VenueImage, alt: 'Wedding photo 8' },
  { id: 9, url: VenueImage, alt: 'Wedding photo 9' },
];
export function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const touchStartXRef = useRef(null);
  const touchStartTimeRef = useRef(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const suppressClickRef = useRef(false);

  const openImage = (index) => {
    setSelectedImageIndex(index);
    setShowSwipeHint(true);
    setTimeout(() => setShowSwipeHint(false), 2500);
  };

  const closeImage = () => {
    setSelectedImageIndex(null);
    setShowSwipeHint(false);
    setDragOffset(0);
  };

  const goToPrevious = () => {
    if (selectedImageIndex === null) return;
    setShowSwipeHint(false);
    const nextIndex = selectedImageIndex === 0 ? galleryImages.length - 1 : selectedImageIndex - 1;
    setSelectedImageIndex(nextIndex);
  };

  const goToNext = () => {
    if (selectedImageIndex === null) return;
    setShowSwipeHint(false);
    const nextIndex = selectedImageIndex === galleryImages.length - 1 ? 0 : selectedImageIndex + 1;
    setSelectedImageIndex(nextIndex);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartTimeRef.current = Date.now();
    setIsDragging(true);
    setShowSwipeHint(false);
    suppressClickRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging || touchStartXRef.current === null) return;
    
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartXRef.current;
    
    // 저항감 적용 (양 끝에서)
    const resistance = 0.5;
    const adjustedOffset = dx * resistance;
    
    setDragOffset(adjustedOffset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const SWIPE_THRESHOLD = 50;
    const VELOCITY_THRESHOLD = 0.5;
    
    const timeDiff = Date.now() - touchStartTimeRef.current;
    const velocity = Math.abs(dragOffset) / timeDiff;
    
    // 빠른 스와이프 또는 충분한 거리 이동 시 페이지 전환
    if (Math.abs(dragOffset) > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
      const width = containerRef.current?.clientWidth ?? window.innerWidth;
      const target = dragOffset < 0 ? -Math.min(600, Math.round(width * 0.9)) : Math.min(600, Math.round(width * 0.9));
      // 현재 이미지를 자연스럽게 밖으로 보낸 다음 인덱스 변경
      setIsDragging(false);
      setIsAnimating(true);
      setDragOffset(target);
      setTimeout(() => {
        if (dragOffset < 0) {
          goToNext();
        } else {
          goToPrevious();
        }
        // 새 이미지로 바뀐 후 위치/애니메이션 초기화
        setIsAnimating(false);
        setDragOffset(0);
      }, 220);
    } else {
      // 리셋
      setIsDragging(false);
      setDragOffset(0);
    }
    touchStartXRef.current = null;
    touchStartTimeRef.current = null;
    // 다음 클릭 이벤트 억제 (터치 후 합성 클릭 방지)
    setTimeout(() => {
      suppressClickRef.current = false;
    }, 50);
  };

  const handleOverlayClick = (e) => {
    // 터치 제스처 직후이거나 드래그 중이면 닫기 방지
    if (suppressClickRef.current || isDragging || Math.abs(dragOffset) > 0) {
      e.stopPropagation();
      return;
    }
    closeImage();
  };

  // 이미지 슬라이드 스타일
  const getImageStyle = () => {
    return {
      transform: `translateX(${dragOffset}px)`,
      transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1)',
      opacity: 1 - Math.abs(dragOffset) / 400 // 드래그 시 약간 투명해짐
    };
  };

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-lg text-pink mb-2">Gallery</h2>
          <p className="text-gray-400 text-sm">갤러리</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => openImage(index)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={handleOverlayClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y' }}
          >
            {showSwipeHint && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm animate-pulse pointer-events-none text-sm">
                ← 사진을 밀어서 넘겨보세요 →
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeImage();
              }}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={3} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={3} />
            </button>

            {/* Image Container - 드래그 가능 */}
            <div
              ref={containerRef}
              className="w-full h-[80vh] flex items-center justify-center px-16 select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                style={getImageStyle()}
                className="relative"
              >
                <img
                  src={galleryImages[selectedImageIndex].url}
                  alt={galleryImages[selectedImageIndex].alt}
                  className="max-h-[80vh] max-w-full w-auto h-auto object-contain rounded-lg pointer-events-none"
                  draggable="false"
                />
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}