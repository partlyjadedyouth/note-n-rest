import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    // 요청 본문에서 userId와 password 추출
    const { userId, password } = await request.json();

    // userId나 password가 없는 경우 400 에러 반환
    if (!userId || !password) {
      return NextResponse.json(
        { error: "아이디와 비밀번호를 모두 입력해주세요." },
        { status: 400 },
      );
    }

    // DB 연결
    await connectDB();

    // 사용자 찾기
    const user = await User.findOne({ userId });

    // 사용자가 존재하지 않는 경우
    if (!user) {
      return NextResponse.json(
        { error: "아이디 또는 비밀번호가 일치하지 않습니다." },
        { status: 401 },
      );
    }

    // 비밀번호 검증 (실제 운영환경에서는 해시화된 비밀번호 비교 필요)
    if (user.password !== password) {
      return NextResponse.json(
        { error: "아이디 또는 비밀번호가 일치하지 않습니다." },
        { status: 401 },
      );
    }

    // 쿠키 설정 (24시간 유효)
    const response = NextResponse.json(
      { success: true, message: "로그인 성공" },
      { status: 200 },
    );

    response.cookies.set("auth", user.userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24시간
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
