
import { ScrollAnimation } from './ScrollAnimation';



export function Info() {
  
  return (
    <div id="info" className="py-8 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <ScrollAnimation>
            <div className="text-center bg-gray-50 space-y-6 text-gray-700 leading-relaxed">
          <p>
          2027년 3월 21일 일요일 오후 4시 (16:00)
            <br />
            일본 니가타 그랜드호텔 (3 Nocho Shimookawamaedori, Chuo Ward, Niigata, 951-8052 일본)
          </p>
          </div>
        </ScrollAnimation>

      </div>
    </div>
  );
}
