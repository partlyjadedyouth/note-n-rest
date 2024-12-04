/**
 * 로그인 API 라우트
 *
 * 사용자 인증을 처리하고 세션 쿠키를 설정하는 엔드포인트
 * POST 요청으로 사용자 ID와 비밀번호를 받아 처리
 * 인증 성공 시 httpOnly 쿠키를 설정하여 보안 세션 유지
 *
 * @param {NextRequest} request - 클라이언트로부터의 요청 객체
 * @returns {NextResponse} 로그인 결과와 세션 쿠키가 포함된 응답
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { ErrorTypes } from "@/types/error";
import { handleApiError } from "@/utils/error-handler";

export async function POST(request: NextRequest) {
  try {
    // 요청 본문에서 사용자 ID와 비밀번호 추출
    const { userId, password } = await request.json();

    // 필수 입력값 검증
    if (!userId || !password) {
      throw ErrorTypes.BAD_REQUEST;
    }

    // MongoDB 데이터베이스 연결
    await connectDB();

    // 사용자 ID로 데이터베이스에서 사용자 검색
    const user = await User.findOne({ userId });

    // 사용자가 존재하지 않거나 비밀번호가 일치하지 않는 경우 에러 발생
    if (!user || user.password !== password) {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    // 로그인 성공 응답 객체 생성
    const response = NextResponse.json(
      { success: true, message: "로그인 성공" },
      { status: 200 },
    );

    // 세션 쿠키 설정
    // - httpOnly: XSS 공격 방지를 위해 JavaScript에서 접근 불가
    // - secure: HTTPS에서만 쿠키 전송 (프로덕션 환경에서만 활성화)
    // - sameSite: CSRF 공격 방지
    // - maxAge: 쿠키 유효 기간 (24시간)
    response.cookies.set("session", user.userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    // 에러 발생 시 handleApiError 유틸리티 함수를 사용하여 에러 처리
    return handleApiError(error);
  }
}
