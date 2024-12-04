/**
 * 일기 작성 API 라우트
 *
 * 새로운 일기를 생성하는 엔드포인트
 * 인증된 사용자만 접근 가능하며, 날짜와 내용을 필수로 받음
 *
 * @returns {Promise<NextResponse>} 생성된 일기 데이터
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Diary } from "@/models/Diary";
import { cookies } from "next/headers";
import { ErrorTypes } from "@/types/error";
import { handleApiError } from "@/utils/error-handler";

export async function POST(request: NextRequest) {
  try {
    // 쿠키에서 세션 사용자 ID 추출
    const cookieStore = await cookies();
    const userId = cookieStore.get("session")?.value;

    // 인증되지 않은 요청 처리
    if (!userId) {
      throw ErrorTypes.UNAUTHORIZED;
    }

    // 요청 본문에서 날짜와 내용 추출
    const { date, content } = await request.json();

    // 필수 입력값 검증
    if (!date || !content) {
      throw ErrorTypes.BAD_REQUEST;
    }

    // 데이터베이스 연결
    await connectDB();

    // 새로운 일기 생성
    const diary = await Diary.create({
      userId,
      date,
      content,
    });

    // 생성된 일기 데이터 반환
    return NextResponse.json(diary, { status: 201 });
  } catch (error) {
    // 에러 처리
    return handleApiError(error);
  }
}
