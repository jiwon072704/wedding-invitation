import { Phone, X } from 'lucide-react';
import { useState } from 'react';
import { ScrollAnimation } from './ScrollAnimation';

export function CoupleInfo() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="py-16 px-6 max-w-2xl mx-auto">
      <ScrollAnimation>
      <div className="text-center mb-12">
            <h2 className="text-lg mb-2 text-pink">Invitation</h2>
            <p className="text-gray-400 text-sm">초대합니다</p>
          </div>
        <div className="text-center mb-12 space-y-6 text-gray-700 leading-relaxed">
          <p>
          한국과 일본, 서로 다른 곳에서 살아온 두 사람이 인연을 맺고 하나의 가족이 되었습니다. 귀한 걸음으로 저희의 새로운 시작을 함께해 주시고, 앞으로의 행복을 따뜻하게 축복해 주시면 감사하겠습니다.

          </p>
        </div>
      </ScrollAnimation>

      {/* Couple Names with Contact */}
      <ScrollAnimation delay={200}>
        <div className="text-center space-y-3 mb-8 text-gray-700">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm">한춘석 · 최경순</span>
            <span className="text-sm text-gray-400">의 아들</span>
            <span>한지수</span>
            <button
              onClick={() => handleCall('01026651863')}
              className="inline-flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Phone className="w-4 h-4 text-pink" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm">테라야마 아츠시 · 테라야마 쿠미코</span>
            <span className="text-sm text-gray-400">의 딸</span>
            <span>테리야마 미쿠</span>
            <button
              onClick={() => handleCall('01039274136')}
              className="inline-flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Phone className="w-4 h-4 text-pink" />
            </button>
          </div>
        </div>
      </ScrollAnimation>

      {/* Parents Contact Button */}
      <ScrollAnimation delay={400}>
        <div className="mb-12">
          <button
            onClick={() => setContactModalOpen(true)}
            className="w-full px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            혼주에게 연락하기
          </button>
        </div>
      </ScrollAnimation>

      {/* Parents Contact Modal */}
      {contactModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl">혼주에게 연락하기</h3>
              <button
                onClick={() => setContactModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Groom Parents */}
              <div className="space-y-3">
                <div className="text-sm text-gray-500 mb-3">신랑측 혼주</div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-700">아버지 한춘석</span>
                  <button
                    onClick={() => handleCall('01036711863')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">전화하기</span>
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-700">어머니 최경순</span>
                  <button
                    onClick={() => handleCall('01055781863')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">전화하기</span>
                  </button>
                </div>
              </div>

              {/* Bride Parents */}
              <div className="space-y-3">
                <div className="text-sm text-gray-500 mb-3">신부측 혼주</div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-700">아버지 테라야마 아츠시</span>

                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-700">어머니 테라야마 쿠미코
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}