/**
 * 에러 처리 유틸리티
 *
 * API 응답과 클라이언트 사이드에서 발생하는 에러를 일관되게 처리하기 위한 유틸리티 함수들을 제공
 * - handleApiError: API 응답에서 발생하는 에러를 처리
 * - handleClientError: 클라이언트 사이드에서 발생하는 에러를 처리
 */

import { AppError } from "@/types/error";
import { NextResponse } from "next/server";

// API 에러 처리를 위한 유틸리티 함수
export const handleApiError = (error: unknown) => {
  // AppError 인스턴스인 경우 (커스텀 에러)
  if (error instanceof AppError) {
    // 에러 메시지와 상태 코드를 포함한 JSON 응답 반환
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode },
    );
  }

  // 일반 Error 인스턴스인 경우 (기본 JavaScript 에러)
  if (error instanceof Error) {
    // 에러 메시지와 함께 500 상태 코드 반환
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 예상치 못한 에러 타입인 경우 기본 서버 에러 메시지 반환
  return NextResponse.json(
    { error: "서버 오류가 발생했습니다." },
    { status: 500 },
  );
};

// 클라이언트 사이드 에러 처리를 위한 유틸리티 함수
export const handleClientError = (error: unknown): string => {
  // Error 인스턴스인 경우 해당 에러 메시지 반환
  if (error instanceof Error) {
    return error.message;
  }
  // 그 외의 경우 기본 에러 메시지 반환
  return "오류가 발생했습니다.";
};
