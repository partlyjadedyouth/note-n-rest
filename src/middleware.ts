import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 보호된 라우트 목록 정의
const protectedRoutes = ["/", "/diary"];
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  // 현재 세션 토큰 확인
  const token = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  // 보호된 라우트에 접근하려 할 때 토큰이 없는 경우
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 이미 로그인된 상태에서 인증 페이지 접근 시도할 경우
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/diary/:path*"],
};
