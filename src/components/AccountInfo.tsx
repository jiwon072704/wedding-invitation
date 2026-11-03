import { useState } from 'react';
import { Wallet, Copy, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimation';

interface Account {
  bank: string;
  accountNumber: string;
  holder: string;
}

export function AccountInfo() {
  const [groomOpen, setGroomOpen] = useState(true);
  const [brideOpen, setBrideOpen] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const groomAccounts: Account[] = [
    {
      bank: '하나은행',
      accountNumber: '438-910939-76307',
      holder: '한지수'
    },
    {
      bank: '새마을금고',
      accountNumber: '9003-2101-4986-1',
      holder: '한춘석(신랑 아버지)'
    },
    {
      bank: '국민은행',
      accountNumber: '506501-04-345101',
      holder: '최경순(신랑 어머니)'
    }
  ];

  const brideAccounts: Account[] = [
    {
      bank: '우리은행',
      accountNumber: ' 1002-466-672100',
      holder: '테리야마 미쿠'
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const AccountItem = ({ account, prefix }: { account: Account; prefix: string }) => {
    const id = `${prefix}-${account.holder}`;
    const isCopied = copiedId === id;

    return (
      <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
        <div className="flex-1">
          <div className="text-sm text-gray-600 mb-1">{account.bank}</div>
          <div className="mb-1">{account.accountNumber}</div>
          <div className="text-sm text-gray-500">{account.holder}</div>
        </div>
        <button
          onClick={() => copyToClipboard(account.accountNumber.replace(/-/g, ''), id)}
          className={`ml-4 px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
            isCopied
              ? 'bg-pink text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm">복사됨</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-sm">복사</span>
            </>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-lg text-pink mb-2">Account Info</h2>
            <p className="text-gray-400 text-sm mb-2">마음 전하실 곳</p>
            <p className="text-gray-500 text-sm">
              참석이 어려워 직접 축하를 전하지 못하는<br />
              분들을 위해 계좌번호를 기재하였습니다.<br />
              넓은 마음으로 양해 부탁드립니다.<br />
            </p>
          </div>
        </ScrollAnimation>

        <div className="space-y-4">
          {/* Groom Section */}
          <ScrollAnimation delay={200}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
              <button
                onClick={() => setGroomOpen(!groomOpen)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
              
                  <div className="text-center">
                    <div className="text-md text-gray-600">신랑측</div>
                  </div>
                </div>
                {groomOpen ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {groomOpen && (
                <div className="px-6 pb-5 border-t border-gray-100">
                  <div className="pt-4 space-y-1">
                    {groomAccounts.map((account, index) => (
                      <AccountItem
                        key={index}
                        account={account}
                        prefix="groom"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

          {/* Bride Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => setBrideOpen(!brideOpen)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
      
                  <div className="text-center">
                    <div className="text-md text-gray-600">신부측</div>
                  </div>
                </div>
                {brideOpen ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {brideOpen && (
                <div className="px-6 pb-5 border-t border-gray-100">
                  <div className="pt-4 space-y-1">
                    {brideAccounts.map((account, index) => (
                      <AccountItem
                        key={index}
                        account={account}
                        prefix="bride"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}