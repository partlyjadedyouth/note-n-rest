import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 로그인이 필요하지 않은 경로 목록
const publicPaths = ["/login", "/api/auth/login"];

export function middleware(request: NextRequest) {
  // 현재 경로가 public path인지 확인
  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  // 인증 쿠키 확인
  const authCookie = request.cookies.get("auth");

  // 로그인이 필요한 페이지에 접근하려 할 때 로그인이 되어있지 않은 경우
  if (!isPublicPath && !authCookie) {
    // 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 이미 로그인된 상태에서 로그인 페이지에 접근하려는 경우
  if (isPublicPath && authCookie) {
    // 메인 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
