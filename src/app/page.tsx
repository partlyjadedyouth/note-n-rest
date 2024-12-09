"use client";

import { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import { DiaryEntry } from "@/types";
import { handleClientError } from "@/utils/error-handler";

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
        if (!userResponse.ok) {
          const errorData = await userResponse.json();
          throw new Error(
            errorData.error || "사용자 정보를 불러오는데 실패했습니다."
          );
        }
        const userData = await userResponse.json();
        setUserName(userData.name);

        // 일기 엔트리 목록 가져오기
        const entriesResponse = await fetch("/api/diary/entries");
        if (!entriesResponse.ok) {
          const errorData = await entriesResponse.json();
          throw new Error(
            errorData.error || "일기 목록을 불러오는데 실패했습니다."
          );
        }
        const entriesData = await entriesResponse.json();
        setDiaryEntries(entriesData);
      } catch (err) {
        console.error(handleClientError(err));
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
    <div className="min-h-screen p-4 relative">
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-3 bg-white rounded-xl px-4 py-2 shadow-sm">
          <h1 className="text-m font-bold text-gray-800">
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
          className="absolute bottom-6 right-6 btn-floating"
          style={{ maxWidth: "calc(100% - 2rem)" }}
        >
          <span className="text-4xl text-[#FFFBEB]">+</span>
        </button>
      </div>
    </div>
  );
}
