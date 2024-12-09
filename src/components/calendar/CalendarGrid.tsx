/**
 * 캘린더 그리드 컴포넌트
 *
 * 달력의 날짜들을 그리드 형태로 표시하는 컴포넌트
 * - 현재 월의 모든 날짜 표시
 * - 일기가 작성된 날짜 하이라이트
 * - 날짜 클릭 시 해당 날짜의 일기 페이지로 이동
 *
 * @param {Object} props
 * @param {Date[]} props.days - 현재 월의 모든 날짜 배열
 * @param {Date} props.currentDate - 현재 표시 중인 날짜
 * @param {Array} props.entries - 일기가 작성된 날짜 목록
 * @param {Function} props.onDateClick - 날짜 클릭 핸들러
 */

import {
  format,
  // isSameMonth,
  isSameDay,
  isToday,
  parseISO,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { CalendarGridProps } from "@/types";

export default function CalendarGrid({
  days,
  currentDate,
  entries,
  onDateClick,
}: CalendarGridProps) {
  // 현재 월의 시작일과 끝일을 미리 계산
  const currentMonthStart = startOfMonth(currentDate);
  const currentMonthEnd = endOfMonth(currentDate);

  // 각 날짜별 상태를 미리 계산
  const daysWithState = days.map((day) => ({
    date: day,
    dateString: format(day, "yyyy-MM-dd"),
    isCurrentMonth: day >= currentMonthStart && day <= currentMonthEnd,
    isToday: isToday(day),
    hasEntry: entries.some((entry) => isSameDay(parseISO(entry.date), day)),
  }));

  return (
    // 날짜 그리드 컨테이너
    <div className="grid grid-cols-7 grid-rows-6 gap-1 flex-1">
      {/* 모든 날짜를 순회하며 날짜 셀 생성 */}
      {daysWithState.map(
        ({
          date,
          dateString,
          isCurrentMonth,
          isToday: isTodayDate,
          hasEntry,
        }) => (
          <button
            key={date.toString()}
            onClick={() => onDateClick(dateString)}
            // 날짜 셀의 스타일링 - 조건부 클래스 적용
            className={`
            flex-1 aspect-square flex items-center justify-center rounded-lg text-sm
            transition-colors relative
            ${
              // 현재 월의 날짜가 아닌 경우 흐리게 표시
              !isCurrentMonth ? "text-gray-300" : "text-gray-800"
            }
            ${
              // 오늘 날짜인 경우 특별한 스타일 적용
              isTodayDate
                ? "bg-[#FFE8A3] text-gray-800 font-semibold"
                : "hover:bg-[#FFF1C2]"
            }
          `}
          >
            {/* 날짜 숫자 표시 */}
            {format(date, "d")}

            {/* 일기가 있는 경우 표시할 인디케이터 */}
            {hasEntry && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-1 bg-black rounded-full" />
              </div>
            )}
          </button>
        ),
      )}
    </div>
  );
}
