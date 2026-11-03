import { useState } from "react";
import { motion } from "motion/react";
import { Users, Check, X, MessageSquare, Calendar } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/button";
import type { RSVPResponse } from "./WeddingRSVP";

interface GuestListProps {
  responses: RSVPResponse[];
  onClear: () => void;
}

export function GuestList({ responses, onClear }: GuestListProps) {
  const [showAll, setShowAll] = useState(false);

  const attendingResponses = responses.filter(r => r.attendance === "attending");
  const notAttendingResponses = responses.filter(r => r.attendance === "not-attending");
  const totalGuests = attendingResponses.reduce((sum, r) => sum + r.guestCount, 0);

  const displayedResponses = showAll ? responses : responses.slice(0, 5);

  return (
    <div className="py-16 px-6 bg-white">
      <motion.div 
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl text-center mb-10 text-gray-800">참석 현황</h2>

        {/* 통계 카드 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{responses.length}</p>
            <p className="text-sm text-gray-600">전체 응답</p>
          </Card>
          <Card className="p-4 text-center">
            <Check className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{attendingResponses.length}</p>
            <p className="text-sm text-gray-600">참석</p>
          </Card>
          <Card className="p-4 text-center">
            <X className="w-6 h-6 mx-auto mb-2 text-red-500" />
            <p className="text-2xl font-bold">{notAttendingResponses.length}</p>
            <p className="text-sm text-gray-600">불참</p>
          </Card>
        </div>

        <Card className="p-4 mb-8 bg-pink-50 border-pink-200">
          <div className="flex items-center gap-2 justify-center">
            <Users className="w-5 h-5 text-pink-600" />
            <p className="text-lg">
              총 <span className="font-bold text-pink-600">{totalGuests}명</span>이 참석 예정입니다
            </p>
          </div>
        </Card>

        {/* 응답 목록 */}
        {responses.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>아직 참석 의사를 전달한 하객이 없습니다</p>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {displayedResponses.map((response) => (
                <Card key={response.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        response.attendance === "attending" ? "bg-green-100" : "bg-gray-100"
                      }`}>
                        {response.attendance === "attending" ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{response.name}</h3>
                        <p className="text-sm text-gray-600">
                          {response.attendance === "attending" 
                            ? `참석 (${response.guestCount}명)` 
                            : "불참"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(response.createdAt).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                  
                  {response.message && (
                    <div className="pl-13 pt-2 border-t">
                      <p className="text-sm text-gray-700 mt-2 italic">"{response.message}"</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {responses.length > 5 && (
              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "접기" : `더보기 (${responses.length - 5}개)`}
                </Button>
              </div>
            )}

            <div className="text-center mt-6">
              <Button
                variant="destructive"
                onClick={() => {
                  if (confirm("모든 참석 응답을 삭제하시겠습니까?")) {
                    onClear();
                  }
                }}
              >
                전체 초기화
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
