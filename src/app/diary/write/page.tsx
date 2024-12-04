"use client";

import { useState, FormEvent, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleClientError } from "@/utils/error-handler";

function WriteDiaryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date =
    searchParams.get("date") || new Date().toISOString().split("T")[0];

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 페이지 진입 시 해당 날짜의 일기 존재 여부 확인
  useEffect(() => {
    const checkExistingDiary = async () => {
      try {
        const response = await fetch(`/api/diary/${date}`);
        if (!response.ok) {
          throw new Error("일기 조회 중 오류가 발생했습니다.");
        }
        const data = await response.json();

        // 이미 일기가 존재하면 해당 일기 페이지로 리다이렉트
        if (data) {
          router.push(`/diary/${date}`);
          return;
        }
        setIsLoading(false);
      } catch (err) {
        setError(handleClientError(err));
        setIsLoading(false);
      }
    };

    checkExistingDiary();
  }, [date, router]);

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

      router.push(`/diary/${date}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 뒤로가기 처리
  const handleBack = () => {
    if (content.trim()) {
      if (confirm("작성 중인 내용이 있습니다. 정말 나가시겠습니까?")) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  };

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] p-4 flex items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB] p-4">
      <div className="max-w-md mx-auto space-y-4">
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

export default function WriteDiaryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WriteDiaryForm />
    </Suspense>
  );
}
