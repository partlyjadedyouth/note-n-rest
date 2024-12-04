/**
 * 로그아웃 API 라우트
 *
 * 사용자의 세션 쿠키를 삭제하여 로그아웃을 처리하는 엔드포인트
 * POST 요청을 처리하며, 세션 쿠키를 삭제한 후 성공 메시지를 반환
 *
 * @returns {NextResponse} 로그아웃 성공 메시지와 상태코드 200을 포함한 응답
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { handleApiError } from "@/utils/error-handler";

export async function POST() {
  try {
    // next/headers의 cookies() 함수를 사용하여 쿠키 스토어에 접근
    const cookieStore = await cookies();

    // 'session' 이름의 쿠키를 삭제하여 사용자 세션을 종료
    cookieStore.delete("session");

    // 로그아웃 성공 메시지와 함께 200 상태코드 반환
    return NextResponse.json({ message: "로그아웃 성공" }, { status: 200 });
  } catch (error) {
    // 에러 발생 시 handleApiError 유틸리티 함수를 사용하여 에러 처리
    return handleApiError(error);
  }
}
