import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { Diary } from "@/models/Diary";
import { DiaryDocument } from "@/types";
import { ErrorTypes } from "@/types/error";
import { handleApiError } from "@/utils/error-handler";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionUserId = cookieStore.get("session")?.value;

    if (!sessionUserId) {
      throw ErrorTypes.UNAUTHORIZED;
    }

    await connectDB();

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
    return handleApiError(error);
  }
}
