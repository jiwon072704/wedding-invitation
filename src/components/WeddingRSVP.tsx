import { useState } from "react";
import { motion } from "motion/react";
import { Check, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card } from "./ui/Card";

export interface RSVPResponse {
  id: string;
  name: string;
  attendance: "attending" | "not-attending";
  guestCount: number;
  message: string;
  createdAt: Date;
}

interface WeddingRSVPProps {
  onSubmit: (response: RSVPResponse) => void;
}

export function WeddingRSVP({ onSubmit }: WeddingRSVPProps) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"attending" | "not-attending">("attending");
  const [guestCount, setGuestCount] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    const response: RSVPResponse = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance,
      guestCount: attendance === "attending" ? parseInt(guestCount) : 0,
      message: message.trim(),
      createdAt: new Date()
    };

    onSubmit(response);
    setSubmitted(true);

    // 3초 후 폼 리셋
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setAttendance("attending");
      setGuestCount("1");
      setMessage("");
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="py-16 px-6 bg-pink-50">
        <motion.div 
          className="max-w-md mx-auto text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl mb-2">참석 의사가 전달되었습니다</h3>
          <p className="text-gray-600">소중한 시간 함께해 주셔서 감사합니다</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-16 px-6 bg-pink-50">
      <motion.div 
        className="max-w-md mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl text-center mb-10 text-gray-800">참석 의사 전달</h2>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label className="mb-3 block">참석 여부 *</Label>
              <RadioGroup value={attendance} onValueChange={(value) => setAttendance(value as "attending" | "not-attending")}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="attending" id="attending" />
                  <Label htmlFor="attending" className="cursor-pointer">참석합니다</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-attending" id="not-attending" />
                  <Label htmlFor="not-attending" className="cursor-pointer">참석이 어렵습니다</Label>
                </div>
              </RadioGroup>
            </div>

            {attendance === "attending" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <Label htmlFor="guestCount">참석 인원</Label>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <Input
                    id="guestCount"
                    type="number"
                    min="1"
                    max="10"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                  />
                  <span className="text-gray-600">명</span>
                </div>
              </motion.div>
            )}

            <div>
              <Label htmlFor="message">축하 메시지</Label>
              <textarea
                id="message"
                className="w-full min-h-24 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="축하의 메시지를 남겨주세요 (선택사항)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
              전달하기
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-4">
          * 표시된 항목은 필수 입력 사항입니다
        </p>
      </motion.div>
    </div>
  );
}
