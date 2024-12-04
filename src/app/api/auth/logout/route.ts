import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { handleApiError } from "@/utils/error-handler";

export async function POST() {
  try {
    // 세션 쿠키 삭제
    const cookieStore = await cookies();
    cookieStore.delete("session");

    return NextResponse.json({ message: "로그아웃 성공" }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
