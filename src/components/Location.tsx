import { MapPin, Bus, Car } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimation';
import { useState } from 'react';

const MAP_URL = 'https://maps.app.goo.gl/5tWrcA8pSSMCf7MW9';
const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=37.921876,139.0523097&z=17&hl=ko&output=embed';
const address = '新潟県新潟市中央区下大川前通3ノ町2230番地';

export function Location() {
  const [copied, setCopied] = useState(false);

  const openGoogleMap = () => {
    window.open(MAP_URL, '_blank', 'noopener,noreferrer');
  };

  const copyAddress = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(address);
      } else {
        const ta = document.createElement('textarea');
        ta.value = address;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // no-op
    }
  };

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-lg text-pink mb-2">Location</h2>
            <p className="text-gray-400 text-sm mb-4">오시는 길</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={200}>
          <div className="bg-gray-200 rounded-2xl overflow-hidden mb-6 shadow-lg">
            <iframe
              title="니가타 그랜드 호텔"
              src={MAP_EMBED_URL}
              className="aspect-video w-full border-0"
              style={{ minHeight: '300px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={300}>
          <div className="bg-white rounded-xl shadow-md p-4 mb-8 border border-gray-200">
            <button
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={openGoogleMap}
            >
              <MapPin className="w-5 h-5 text-gray-700" />
              <span className="text-sm">구글 지도에서 보기</span>
            </button>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={400}>
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bus className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <div className="mb-1">니가타 공항에서 니가타역까지</div>
                <div className="text-sm text-gray-600">
                  버스 : 리무진 버스 홈 승차 → 니가타역 정류장 하차(약 30분) → 도보 1분
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bus className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <div className="mb-1">니가타역 버스 터미널에서 그랜드호텔까지</div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    버스 : 버스 터미널 9번 승차홈(C2 하마우라초선) 또는 10번 승차홈(S2 도야노선) → “이시즈에초” 정류장 하차(약 5분) → 도보 2분
                  </div>
                  <div>택시 : 약 6분 거리</div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <div className="mb-1">
                  주소
                  <button
                    className={`ml-4 px-4 py-2 rounded-lg transition-all items-center gap-2 text-sm ${
                      copied
                        ? 'bg-pink text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                    onClick={copyAddress}
                  >
                    {copied ? '복사됨' : '주소복사'}
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  니가타 그랜드 호텔
                  <br />
                  {address}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
