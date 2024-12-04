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
      throw ErrorTypes.UNAUTHORIZED;
    }

    const { content } = await request.json();

    if (!content) {
      throw ErrorTypes.BAD_REQUEST;
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
      throw ErrorTypes.NOT_FOUND;
    }

    return NextResponse.json(updatedDiary, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
