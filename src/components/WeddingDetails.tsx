import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimation';

export function WeddingDetails() {
  // Calculate D-Day
  const weddingDate = new Date('2027-03-21');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  weddingDate.setHours(0, 0, 0, 0);
  const diffTime = weddingDate.getTime() - today.getTime();
  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-lg text-pink mb-2">Calendar</h2>
            <p className="text-gray-400 text-sm">2027.03.21</p>
          </div>
        </ScrollAnimation>


        {/* Calendar Display */}
        <ScrollAnimation delay={400}>
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="text-center mb-4">
              <div className="text-xl text-gray-700">03월</div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} className="text-center text-sm text-gray-500 py-2">
                  {day}
                </div>
              ))}
              {/* Calendar dates - June 2026 starts on Monday */}
              <div className="text-center py-2"></div>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((date) => (
                <div
                  key={date}
                  className={`text-center py-2 rounded-lg ${
                    date === 21
                      ? 'bg-pink text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {date}
                </div>
              ))}
            </div>

            {/* D-Day Display */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              {dDay > 0 ? (
                <div className="text-2xl text-gray-900">
                </div>
              ) : dDay === 0 ? (
                <div className="text-2xl text-gray-900">
                  D-Day
                </div>
              ) : (
                <div className="text-2xl text-gray-500">
                  결혼식이 지났습니다
                </div>
              )}
            <div className="text-sm text-gray-500 mt-2 px-4 text-center leading-relaxed">
              {dDay > 0 && (
                <>
                  한지수
                  <Heart className="w-3 h-3 text-pink fill-pink inline-block mx-0.5" />
                  테리야마 미쿠의 결혼식이 {dDay}일 남았습니다
                </>
              )}
              {dDay === 0 && '오늘은 결혼식 날입니다'}
            </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}