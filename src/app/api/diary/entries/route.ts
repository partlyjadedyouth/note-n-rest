import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { Diary } from "@/models/Diary";
import { DiaryDocument } from "@/types";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionUserId = cookieStore.get("session")?.value;

    if (!sessionUserId) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 },
      );
    }

    await connectDB();

    // 타입 지정
    const entries = (await Diary.find(
      { userId: sessionUserId },
      { date: 1, _id: 1 },
    ).lean()) as unknown as DiaryDocument[];

    const formattedEntries = entries.map((entry) => ({
      date: entry.date,
      id: entry._id.toString(),
    }));

    return NextResponse.json(formattedEntries, { status: 200 });
  } catch (error) {
    console.error("일기 목록 조회 중 오류 발생:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
