import { ImageWithFallback } from './figma/ImageWithFallback';
import { ScrollAnimation } from './ScrollAnimation';
import HotelImage from '../assets/images/venueg.jpg';

export function GuestInfo() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-lg text-pink mb-2">Information</h2>
            <p className="text-gray-400 text-sm">안내 사항</p>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src={HotelImage}
                alt="니가타 그랜드 호텔"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="text-center space-y-4 text-gray-500 leading-relaxed">
              <p>일본 니가타현 니가타시 그랜드 호텔 3층 유큐노마</p>
              <p>
                회장 전화번호 :{' '}
                <a href="tel:+81252286111" className="underline">
                  81-25-228-6111
                </a>
              </p>
              <p>
                회장 홈페이지 :{' '}
                <a
                  href="https://www.ni-grand.co.jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline break-all"
                >
                  https://www.ni-grand.co.jp
                </a>
              </p>
              <p>
                일본결혼식 방식에 따라 식장 참여는 지정석으로 이뤄지며, 사전 초청 신청을 받아 이뤄집니다.<br />
                신청 및 초청이 없었던 경우, 행사장에 오셔도 입장이 불가한 점 양해 부탁드립니다.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
