import { useEffect, useState } from 'react';

type AttendanceAnswer = 'yes' | 'no';
type AttendanceSide = 'groom' | 'bride';

export function AttendanceModal({
  open,
  onSubmit,
}: {
  open: boolean;
  onSubmit: (payload: { side: AttendanceSide; answer: AttendanceAnswer; name: string }) => void;
}) {
  const [side, setSide] = useState<AttendanceSide | null>(null);
  const [answer, setAnswer] = useState<AttendanceAnswer | null>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg border border-gray-200">
        <div className="text-center mb-4">
          <h2 className="text-xl text-gray-900 mb-2">참석 여부를 알려주세요</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            원활한 준비를 위해 분류/참석 여부/성함을 남겨주세요.
          </p>
        </div>
        {/* 분류 */}
        <div className="mt-4">
          <div className="text-sm text-gray-700 mb-2">분류</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`py-3 rounded-lg text-sm border ${side === 'groom' ? 'bg-pink text-white border-pink' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
              onClick={() => setSide('groom')}
            >
              신랑 한지수측
            </button>
            <button
              type="button"
              className={`py-3 rounded-lg text-sm border ${side === 'bride' ? 'bg-pink text-white border-pink' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
              onClick={() => setSide('bride')}
            >
              신부 테리야마 미쿠측
            </button>
          </div>
        </div>
        {/* 참석 여부 */}
        <div className="mt-4">
          <div className="text-sm text-gray-700 mb-2">참석 여부</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`py-3 rounded-lg text-sm border ${answer === 'yes' ? 'bg-green-500 text-white border-green-500' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
              onClick={() => setAnswer('yes')}
            >
              참석해요
            </button>
            <button
              type="button"
              className={`py-3 rounded-lg text-sm border ${answer === 'no' ? 'bg-gray-700 text-white border-gray-700' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
              onClick={() => setAnswer('no')}
            >
              어려울 것 같아요
            </button>
          </div>
        </div>
        {/* 성함 */}
        <div className="mt-4">
          <label className="text-sm text-gray-700 mb-2 block" htmlFor="attendeeName">성함</label>
          <input
            id="attendeeName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 홍길동"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          />
        </div>
        {/* 제출 */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            className="flex-1 py-3 rounded-lg bg-pink text-white text-sm disabled:opacity-80 disabled:cursor-not-allowed"
            disabled={!side || !answer || name.trim().length === 0}
            onClick={() => {
              if (!side || !answer || name.trim().length === 0) return;
              onSubmit({ side, answer, name: name.trim() });
            }}
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}

