"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function WriteDiaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date =
    searchParams.get("date") || new Date().toISOString().split("T")[0];

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 일기 저장 처리
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("일기 저장에 실패했습니다.");
      }

      // 저장 성공 시 해당 날짜의 일기 페이지로 이동
      router.push(`/diary/${date}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 일기 작성 영역 */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="오늘의 이야기를 들려주세요..."
            className="w-full h-[60vh] p-4 bg-white rounded-xl shadow-sm 
                     border border-gray-200 focus:border-[#FFE8A3] 
                     focus:ring-2 focus:ring-[#FFE8A3] focus:outline-none 
                     transition-colors resize-none"
            required
          />

          {/* 완료 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-[#FFE8A3] hover:bg-[#FFE093] 
                     text-gray-800 font-medium rounded-lg transition-colors 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "저장 중..." : "완료"}
          </button>
        </form>
      </div>
    </div>
  );
}
