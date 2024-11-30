"use client";

import { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

// 일기 엔트리 타입 정의
interface DiaryEntry {
  date: string;
  id: string;
}

export default function HomePage() {
  const router = useRouter();
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [userName, setUserName] = useState<string>("");

  // 사용자 정보와 일기 엔트리 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 정보 가져오기
        const userResponse = await fetch("/api/user");
        const userData = await userResponse.json();
        setUserName(userData.name);

        // 일기 엔트리 목록 가져오기
        const entriesResponse = await fetch("/api/diary/entries");
        const entriesData = await entriesResponse.json();
        setDiaryEntries(entriesData);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      }
    };
    fetchData();
  }, []);

  // 로그아웃 처리
  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  // 일기 작성 페이지로 이동
  const handleWrite = () => {
    // 오늘 날짜를 YYYY-MM-DD 형식으로 가져옴
    const today = new Date().toISOString().split("T")[0];
    router.push(`/diary/write?date=${today}`);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] p-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6 bg-white rounded-xl p-4 shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">
            안녕하세요, {userName}님!
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            로그아웃
          </button>
        </div>

        <Calendar
          entries={diaryEntries}
          onDateClick={(date) => router.push(`/diary/${date}`)}
        />

        <button
          onClick={handleWrite}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#FFE8A3] text-gray-800 
                   rounded-full flex items-center justify-center shadow-lg 
                   hover:bg-[#FFE093] transition-colors"
        >
          <span className="text-2xl">+</span>
        </button>
      </div>
    </div>
  );
}
