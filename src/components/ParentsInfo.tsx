import { ImageWithFallback } from './figma/ImageWithFallback';
import { ScrollAnimation } from './ScrollAnimation';
import venueImage from '../assets/images/venueg.jpg';

export function ParentsInfo() {
  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-lg text-pink mb-2">Our Parents</h2>
            <p className="text-gray-400 text-sm">
              두 사람의 소중한 인연을 맺어주신<br />
              양가 부모님을 소개합니다
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Groom's Parents */}
          <ScrollAnimation delay={200}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 mb-8">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={venueImage}
                  alt="신랑 부모님"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <div className="text-xl mb-2">신랑측 혼주</div>
                <div className="space-y-1 text-gray-600">
                  <div>
                    <span className="text-sm text-gray-500">아버지</span>
                    <span className="ml-2"> 한춘석</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">어머니</span>
                    <span className="ml-2"> 최경순</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Bride's Parents */}
          <ScrollAnimation delay={400}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 mb-8">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={venueImage}
                  alt="신부 부모님"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <div className="text-xl mb-2">신부측 혼주</div>
                <div className="space-y-1 text-gray-600">
                  <div>
                    <span className="text-sm text-gray-500">아버지</span>
                    <span className="ml-2"> 테라야마 아츠시</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">어머니</span>
                    <span className="ml-2"> 테라야마 쿠미코</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation delay={600}>
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm leading-relaxed">
              평생을 살아오시며 쌓아오신 사랑과 지혜로<br />
              저희 두 사람을 이 자리까지 인도해 주셨습니다
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
