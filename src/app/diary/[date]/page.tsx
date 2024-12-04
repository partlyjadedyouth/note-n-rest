"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { DiaryEntry } from "@/types";
import { handleClientError } from "@/utils/error-handler";

export default function DiaryPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const router = useRouter();
  const { date } = use(params);
  const [diary, setDiary] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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
        setEditContent(data?.content || "");
      } catch (err) {
        setError(handleClientError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [date]);

  // 수정 저장 처리
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/diary/${date}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (!response.ok) {
        throw new Error("일기 수정에 실패했습니다.");
      }

      const updatedDiary = await response.json();
      setDiary(updatedDiary);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  // 뒤로가기 처리
  const handleBack = () => {
    if (isEditing) {
      if (confirm("수정을 취소하시겠습니까?")) {
        setIsEditing(false);
        setEditContent(diary?.content || "");
      }
      return;
    }
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
        {/* 상단 버튼 영역 */}
        <div className="flex justify-between items-center">
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
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-white 
                       rounded-lg transition-colors"
            >
              수정
            </button>
          )}
        </div>

        {/* 일기 내용 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full h-[60vh] p-4 bg-white rounded-xl 
                         border border-gray-200 focus:border-[#FFE8A3] 
                         focus:ring-2 focus:ring-[#FFE8A3] focus:outline-none 
                         transition-colors resize-none"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(diary.content);
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 
                           rounded-lg transition-colors"
                  disabled={isSaving}
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm bg-[#FFE8A3] hover:bg-[#FFE093] 
                           text-gray-800 rounded-lg transition-colors 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "저장 중..." : "저장"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap">{diary.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
