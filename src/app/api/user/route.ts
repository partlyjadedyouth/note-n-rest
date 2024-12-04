import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { cookies } from "next/headers";
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

    const user = await User.findOne({ userId: sessionUserId }, { password: 0 });

    if (!user) {
      throw ErrorTypes.NOT_FOUND;
    }

    return NextResponse.json(
      {
        userId: user.userId,
        name: user.name,
      },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
