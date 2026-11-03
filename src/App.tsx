import { WeddingHero } from './components/WeddingHero';
import { CoupleInfo } from './components/CoupleInfo';
import { WeddingDetails } from './components/WeddingDetails';
import { Gallery } from './components/Gallery';
import { Location } from './components/Location';
import { AccountInfo } from './components/AccountInfo';
import { ParentsInfo } from './components/ParentsInfo';
import { Info } from './components/Info';
import { GuestInfo } from './components/GuestInfo';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App() {
  const shareToKatalk = () => {
    const Kakao = (window as any).Kakao;
    if (!Kakao) {
      alert('Kakao SDK 로드 실패');
      return;
    }
    if (!Kakao.isInitialized()) {
      const appKey = import.meta.env.VITE_KAKAO_APP_KEY ?? '582bad0acb82f7e49b65c36376853c99';
      if (!appKey) {
        alert('VITE_KAKAO_APP_KEY가 설정되지 않았습니다.');
        return;
      }
      Kakao.init(appKey);
    }

    Kakao.Share.sendCustom({
      templateId: 127287,
      templateArgs: {
        '청첩장URL': 'https://Jisoo-and-miku.com',
      }
    });
    alert('카카오톡으로 공유되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  via-white ">
      <WeddingHero />
      <Info />
      <CoupleInfo />
      <WeddingDetails />
      <ParentsInfo />
      <Gallery />
      <Location />
      <GuestInfo />
      <AccountInfo />
      {/* <WeddingRSVP onSubmit={handleRSVPSubmit} />
      <GuestList responses={responses} onClear={handleClearResponses} /> */}
      
      
      {/* Footer */}
      <div className="py-8 text-center text-gray-400 text-sm">
        <p>저희 두사람의 시작을 진심으로 축복해주시는 <br /> 모든 분들께 머리숙여 깊은 감사드립니다. </p>
        <p>행복하게 잘 살겠습니다.</p><br />
        <p onClick={shareToKatalk}>신랑 한지수 · 신부 테리야마 미쿠</p>
      </div>
    </div>
  );
}