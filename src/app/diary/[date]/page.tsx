"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  music?: {
    title: string;
    artist: string;
    url: string;
  };
}

export default function DiaryPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = use(params);
  const router = useRouter();
  const [diary, setDiary] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 일기 데이터 불러오기
  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await fetch(`/api/diary/${date}`);
        if (!response.ok) {
          throw new Error("일기를 불러오는데 실패했습니다.");
        }
        const data = await response.json();
        setDiary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [date]);

  // 뒤로가기 처리
  const handleBack = () => {
    router.push("/");
  };

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] p-4 flex items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  // 에러 표시
  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] p-4 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  // 일기가 없는 경우
  if (!diary) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] p-4 relative">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBack}
          className="mb-4 p-2 hover:bg-white rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-gray-600">작성한 일기가 없습니다</p>
        </div>
        <button
          onClick={() => router.push(`/diary/write?date=${date}`)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#FFE8A3] text-gray-800 
                   rounded-full flex items-center justify-center shadow-lg 
                   hover:bg-[#FFE093] transition-colors"
        >
          <span className="text-2xl">+</span>
        </button>
      </div>
    );
  }

  // 일기가 있는 경우
  return (
    <div className="min-h-screen bg-[#FFFBEB] p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBack}
          className="p-2 hover:bg-white rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* 음악 플레이어 */}
        {diary.music && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              오늘의 음악
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{diary.music.title}</p>
              <p className="text-xs text-gray-500">{diary.music.artist}</p>
              <audio src={diary.music.url} controls className="w-full" />
            </div>
          </div>
        )}

        {/* 일기 내용 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-800 whitespace-pre-wrap">{diary.content}</p>
        </div>
      </div>
    </div>
  );
}
