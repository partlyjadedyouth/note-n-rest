import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // 쿠키에서 세션 정보 가져오기
    const cookieStore = await cookies();
    const sessionUserId = cookieStore.get("session")?.value;

    // 세션이 없는 경우 인증 오류 반환
    if (!sessionUserId) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 },
      );
    }

    // DB 연결
    await connectDB();

    // 사용자 정보 조회 (비밀번호 제외)
    const user = await User.findOne(
      { userId: sessionUserId },
      { password: 0 }, // 비밀번호 필드 제외
    );

    // 사용자가 존재하지 않는 경우
    if (!user) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    // 사용자 정보 반환
    return NextResponse.json(
      {
        userId: user.userId,
        name: user.name,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("사용자 정보 조회 중 오류 발생:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
