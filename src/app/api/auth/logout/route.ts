import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // 세션 쿠키 삭제 - cookies()를 await로 처리
    const cookieStore = await cookies();
    cookieStore.delete("session");

    return NextResponse.json({ message: "로그아웃 성공" }, { status: 200 });
  } catch (error) {
    console.error("로그아웃 처리 중 오류 발생:", error);
    return NextResponse.json(
      { error: "로그아웃 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
