"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { DiaryEntry } from "@/types";
import { handleClientError } from "@/utils/error-handler";
import BackButton from "@/components/BackButton";

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
          const errorData = await response.json();
          throw new Error(errorData.error || "일기를 불러오는데 실패했습니다.");
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
      setError(handleClientError(err));
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
      <div className="min-h-screen bg-[#FFFBEB] flex flex-col">
        {/* 상단 영역 */}
        <div className="p-4">
          <BackButton onClick={handleBack} className="m-6 h-6" />
        </div>

        {/* 중앙 컨텐츠 영역 */}
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">작성한 일기가 없습니다</p>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="p-4">
          <button
            onClick={() => router.push(`/diary/write?date=${date}`)}
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

  // 일기가 있는 경우
  return (
    <div className="min-h-screen bg-[#FFFBEB] flex flex-col">
      <div className="p-4 flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* 상단 버튼 영역 */}
        <div className="flex justify-between items-center mb-6">
          <BackButton onClick={handleBack} className="m-6 h-6" />
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

        {/* 일기 내용 영역 - flex-1을 사용하여 남은 공간을 채움 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          {isEditing ? (
            <div className="h-full flex flex-col">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="flex-1 p-4 bg-white rounded-xl 
                         border border-gray-200 focus:border-[#FFE8A3] 
                         focus:ring-2 focus:ring-[#FFE8A3] focus:outline-none 
                         transition-colors resize-none min-h-[50vh]"
                required
              />
              <div className="flex justify-end space-x-2 mt-4">
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
