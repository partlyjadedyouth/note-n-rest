/**
 * Next.js 미들웨어
 *
 * 라우트 보호 및 인증 상태에 따른 리다이렉션을 처리하는 미들웨어
 * - 보호된 라우트에 대한 인증 검사
 * - 인증된 사용자의 인증 페이지 접근 제한
 * - 인증되지 않은 사용자의 보호된 라우트 접근 시 로그인 페이지로 리다이렉션
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ErrorTypes } from "@/types/error";

// 로그인이 필요한 보호된 라우트 목록
const protectedRoutes = ["/", "/diary"];
// 로그인/회원가입 등 인증 관련 라우트 목록
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  try {
    // 요청의 쿠키에서 세션 토큰 추출
    const token = request.cookies.get("session");
    // 현재 요청된 경로 추출
    const { pathname } = request.nextUrl;

    // 보호된 라우트 접근 시 토큰 검사
    // some()을 사용하여 현재 경로가 보호된 라우트로 시작하는지 확인
    if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
      // 토큰이 없으면 인증되지 않은 사용자로 간주하고 에러 발생
      throw ErrorTypes.UNAUTHORIZED;
    }

    // 이미 로그인된 사용자가 로그인/회원가입 페이지 접근 시도 시
    if (authRoutes.includes(pathname) && token) {
      // 메인 페이지로 리다이렉션
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 위의 조건에 해당하지 않는 경우 다음 미들웨어나 라우트 핸들러로 진행
    return NextResponse.next();
  } catch (error) {
    // 인증되지 않은 사용자 에러인 경우
    if (error === ErrorTypes.UNAUTHORIZED) {
      // 로그인 페이지로 리다이렉션
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // 기타 에러는 무시하고 다음 처리로 진행
    return NextResponse.next();
  }
}

// 미들웨어가 적용될 경로 패턴 설정
export const config = {
  // 메인 페이지, 로그인, 회원가입, 일기 관련 모든 경로에 미들웨어 적용
  matcher: ["/", "/login", "/register", "/diary/:path*"],
};
