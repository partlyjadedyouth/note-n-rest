/**
 * 일기 목록 조회 API 라우트
 *
 * 현재 로그인한 사용자의 모든 일기 엔트리 목록을 조회하는 엔드포인트
 * 캘린더 표시를 위해 일기가 작성된 날짜 정보만 반환
 *
 * @returns {Promise<NextResponse>} 일기 작성 날짜와 ID 목록
 */

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { Diary } from "@/models/Diary";
import { DiaryDocument } from "@/types";
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

    // 사용자의 모든 일기 엔트리 조회
    // date와 _id 필드만 선택하여 조회 최적화
    const entries = (await Diary.find(
      { userId: sessionUserId },
      { date: 1, _id: 1 },
    ).lean()) as unknown as DiaryDocument[];

    // 클라이언트에서 사용하기 쉬운 형태로 데이터 변환
    const formattedEntries = entries.map((entry) => ({
      date: entry.date,
      id: entry._id.toString(),
    }));

    // 성공 응답 반환
    return NextResponse.json(formattedEntries, { status: 200 });
  } catch (error) {
    // 에러 처리
    return handleApiError(error);
  }
}
