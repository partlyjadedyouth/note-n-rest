/**
 * 캘린더 헤더 컴포넌트
 *
 * 현재 표시되는 년월과 이전/다음 월 이동 버튼을 포함하는 캘린더 상단 컴포넌트
 *
 * @param {Object} props
 * @param {Date} props.currentDate - 현재 표시되는 날짜
 * @param {Function} props.onPrevMonth - 이전 월 이동 핸들러
 * @param {Function} props.onNextMonth - 다음 월 이동 핸들러
 */

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarHeaderProps } from "@/types";

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    // 헤더 컨테이너
    <div className="flex justify-between items-center mb-4">
      {/* 이전 월 이동 버튼 */}
      <button
        onClick={onPrevMonth}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* 현재 년월 표시 */}
      <h2 className="text-lg font-semibold text-gray-800">
        {/* date-fns를 사용하여 한글로 년월 포맷팅 */}
        {format(currentDate, "yyyy년 M월", { locale: ko })}
      </h2>

      {/* 다음 월 이동 버튼 */}
      <button
        onClick={onNextMonth}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
