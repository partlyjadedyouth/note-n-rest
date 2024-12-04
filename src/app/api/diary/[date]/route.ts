import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Diary } from "@/models/Diary";
import { ErrorTypes } from "@/types/error";
import { handleApiError } from "@/utils/error-handler";

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.pathname.split("/").pop();

    const sessionUserId = request.cookies.get("session")?.value;

    if (!sessionUserId) {
      throw ErrorTypes.UNAUTHORIZED;
    }

    await connectDB();

    const diary = await Diary.findOne({
      userId: sessionUserId,
      date: date,
    });

    return NextResponse.json(diary || null, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const date = request.nextUrl.pathname.split("/").pop();

    const sessionUserId = request.cookies.get("session")?.value;

    if (!sessionUserId) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 },
      );
    }

    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "내용이 비어있습니다." },
        { status: 400 },
      );
    }

    await connectDB();

    const updatedDiary = await Diary.findOneAndUpdate(
      {
        userId: sessionUserId,
        date: date,
      },
      {
        content,
        updatedAt: new Date(),
      },
      { new: true },
    );

    if (!updatedDiary) {
      return NextResponse.json(
        { error: "일기를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedDiary, { status: 200 });
  } catch (error) {
    console.error("일기 수정 중 오류 발생:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
