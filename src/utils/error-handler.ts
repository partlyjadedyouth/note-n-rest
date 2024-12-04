import { AppError } from "@/types/error";
import { NextResponse } from "next/server";

// API 에러 처리를 위한 유틸리티 함수
export const handleApiError = (error: unknown) => {
  // AppError 인스턴스인 경우
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode },
    );
  }

  // 일반 Error 인스턴스인 경우
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 기타 예상치 못한 에러
  return NextResponse.json(
    { error: "서버 오류가 발생했습니다." },
    { status: 500 },
  );
};

// 클라이언트 사이드 에러 처리를 위한 유틸리티 함수
export const handleClientError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "오류가 발생했습니다.";
};
