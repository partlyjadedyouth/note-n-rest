import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Diary } from "@/models/Diary";
import { cookies } from "next/headers";
import { ErrorTypes } from "@/types/error";
import { handleApiError } from "@/utils/error-handler";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session")?.value;

    if (!userId) {
      throw ErrorTypes.UNAUTHORIZED;
    }

    const { date, content } = await request.json();

    if (!date || !content) {
      throw new Error("필수 항목이 누락되었습니다.");
    }

    await connectDB();

    const diary = await Diary.create({
      userId,
      date,
      content,
    });

    return NextResponse.json(diary, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
