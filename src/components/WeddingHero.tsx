import { ImageWithFallback } from './figma/ImageWithFallback';
import weddingImage from '../assets/images/main.png';
import { ChevronDown } from 'lucide-react';


export function WeddingHero() {

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={weddingImage}
          alt="Wedding"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      {/* Scroll Down Indicator */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10 items-center animate-bounce">
        <div className="text-white text-sm opacity-90 leading-none">아래로 내려주세요</div>
        <a href="#info" aria-label="Scroll to information section" className="flex items-center justify-center">
          <ChevronDown className="w-6 h-6 text-white opacity-90" aria-hidden="true" />
        </a> 
      </div>
    </div>
  );
}