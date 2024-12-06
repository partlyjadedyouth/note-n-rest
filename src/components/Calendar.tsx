/**
 * 메인 캘린더 컴포넌트
 *
 * 전체 캘린더 UI를 구성하는 컨테이너 컴포넌트
 * - 현재 월의 날짜 관리
 * - 월 이동 기능
 * - 하위 컴포넌트들을 조합하여 완성된 캘린더 UI 제공
 *
 * @param {Object} props
 * @param {Array} props.entries - 일기가 작성된 날짜 목록
 * @param {Function} props.onDateClick - 날짜 클릭 시 실행될 핸들러
 */

"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addWeeks,
} from "date-fns";
import { CalendarProps } from "@/types";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarWeekdays from "@/components/calendar/CalendarWeekdays";
import CalendarGrid from "@/components/calendar/CalendarGrid";

export default function Calendar({ entries, onDateClick }: CalendarProps) {
  // 현재 표시 중인 날짜 상태 관리
  const [currentDate, setCurrentDate] = useState(new Date());

  // 현재 월의 시작일과 마지막 일 계산
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  // 달력에 표시할 첫 주의 시작일과 마지막 주의 종료일 계산
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(addWeeks(calendarStart, 5), {
    weekStartsOn: 0,
  });

  // 6주 분량의 날짜 배열 생성
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // 이전 월로 이동하는 핸들러
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  // 다음 월로 이동하는 핸들러
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      {/* 캘린더 헤더 - 년월 표시 및 월 이동 버튼 */}
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />
      {/* 요일 표시 행 */}
      <CalendarWeekdays />
      {/* 날짜 그리드 - 실제 달력 날짜들 표시 */}
      <CalendarGrid
        days={days}
        currentDate={currentDate}
        entries={entries}
        onDateClick={onDateClick}
      />
    </div>
  );
}
