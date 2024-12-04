/**
 * 사용자 정보 조회 API 라우트
 *
 * 현재 로그인한 사용자의 기본 정보를 조회하는 엔드포인트
 * 보안을 위해 비밀번호를 제외한 정보만 반환
 *
 * @returns {Promise<NextResponse>} 사용자 ID와 이름 정보
 */

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { cookies } from "next/headers";
import { ErrorTypes } from "@/types/error";
import { handleApiError } from "@/utils/error-handler";

export async function GET() {
  try {
    // 쿠키에서 세션 사용자 ID 추출
    const cookieStore = await cookies();
    const sessionUserId = cookieStore.get("session")?.value;

    // 인증되지 않은 요청 처리
    if (!sessionUserId) {
      throw ErrorTypes.UNAUTHORIZED;
    }

    // 데이터베이스 연결
    await connectDB();

    // 사용자 정보 조회 (비밀번호 필드 제외)
    const user = await User.findOne({ userId: sessionUserId }, { password: 0 });

    // 사용자를 찾지 못한 경우 처리
    if (!user) {
      throw ErrorTypes.NOT_FOUND;
    }

    // 필요한 사용자 정보만 선택하여 반환
    return NextResponse.json(
      {
        userId: user.userId,
        name: user.name,
      },
      { status: 200 },
    );
  } catch (error) {
    // 에러 처리
    return handleApiError(error);
  }
}
