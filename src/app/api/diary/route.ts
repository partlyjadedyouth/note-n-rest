import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Diary } from "@/models/Diary";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // 세션에서 사용자 ID 가져오기
    const cookieStore = await cookies();
    const userId = cookieStore.get("session")?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 },
      );
    }

    // 요청 본문 파싱
    const { date, content } = await request.json();

    // 필수 필드 검증
    if (!date || !content) {
      return NextResponse.json(
        { error: "필수 항목이 누락되었습니다." },
        { status: 400 },
      );
    }

    // DB 연결
    await connectDB();

    // 일기 저장
    const diary = await Diary.create({
      userId,
      date,
      content,
    });

    return NextResponse.json(diary, { status: 201 });
  } catch (error) {
    console.error("일기 저장 중 오류 발생:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
