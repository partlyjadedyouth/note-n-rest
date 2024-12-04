import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { handleApiError } from "@/utils/error-handler";

export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json();

    if (!userId || !password) {
      throw new Error("아이디와 비밀번호를 모두 입력해주세요.");
    }

    await connectDB();

    const user = await User.findOne({ userId });

    if (!user || user.password !== password) {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    const response = NextResponse.json(
      { success: true, message: "로그인 성공" },
      { status: 200 },
    );

    response.cookies.set("session", user.userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
