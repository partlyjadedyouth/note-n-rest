/**
 * 특정 날짜의 일기 조회/수정 API 라우트
 *
 * 특정 날짜의 일기를 조회하거나 수정하는 엔드포인트를 제공
 * - GET: 특정 날짜의 일기 조회
 * - PUT: 특정 날짜의 일기 내용 수정
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Diary } from "@/models/Diary";
import { ErrorTypes } from "@/types/error";
import { handleApiError } from "@/utils/error-handler";

export async function GET(request: NextRequest) {
  try {
    // URL에서 날짜 파라미터 추출
    const date = request.nextUrl.pathname.split("/").pop();

    // 세션 쿠키에서 사용자 ID 추출
    const sessionUserId = request.cookies.get("session")?.value;

    // 인증되지 않은 사용자 처리
    if (!sessionUserId) {
      throw ErrorTypes.UNAUTHORIZED;
    }

    // 데이터베이스 연결
    await connectDB();

    // 해당 날짜와 사용자의 일기 조회
    const diary = await Diary.findOne({
      userId: sessionUserId,
      date: date,
    });

    // 조회 결과 반환 (일기가 없는 경우 null 반환)
    return NextResponse.json(diary || null, { status: 200 });
  } catch (error) {
    // 에러 처리
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    // URL에서 날짜 파라미터 추출
    const date = request.nextUrl.pathname.split("/").pop();
    // 세션 쿠키에서 사용자 ID 추출
    const sessionUserId = request.cookies.get("session")?.value;

    // 인증되지 않은 사용자 처리
    if (!sessionUserId) {
      throw ErrorTypes.UNAUTHORIZED;
    }

    // 요청 본문에서 수정할 내용 추출
    const { content } = await request.json();

    // 내용이 없는 경우 잘못된 요청으로 처리
    if (!content) {
      throw ErrorTypes.BAD_REQUEST;
    }

    // 데이터베이스 연결
    await connectDB();

    // 일기 내용 업데이트
    const updatedDiary = await Diary.findOneAndUpdate(
      {
        userId: sessionUserId,
        date: date,
      },
      {
        content,
        updatedAt: new Date(), // 수정 시간 업데이트
      },
      { new: true }, // 업데이트된 문서 반환
    );

    // 수정할 일기를 찾지 못한 경우
    if (!updatedDiary) {
      throw ErrorTypes.NOT_FOUND;
    }

    // 업데이트된 일기 반환
    return NextResponse.json(updatedDiary, { status: 200 });
  } catch (error) {
    // 에러 처리
    return handleApiError(error);
  }
}
