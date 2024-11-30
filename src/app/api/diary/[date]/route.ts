import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { Diary } from "@/models/Diary";

export async function GET(
  request: NextRequest,
  { params }: { params: { date: string } },
) {
  try {
    // 세션에서 사용자 ID 확인
    const cookieStore = await cookies();
    const sessionUserId = cookieStore.get("session")?.value;

    if (!sessionUserId) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 },
      );
    }

    // DB 연결
    await connectDB();

    // 해당 날짜의 일기 조회
    const diary = await Diary.findOne({
      userId: sessionUserId,
      date: params.date,
    });

    // 일기가 없는 경우 null 반환 (404가 아닌 200으로 처리)
    if (!diary) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(diary, { status: 200 });
  } catch (error) {
    console.error("일기 조회 중 오류 발생:", error);
    return NextResponse.json(
      { error: "��버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
