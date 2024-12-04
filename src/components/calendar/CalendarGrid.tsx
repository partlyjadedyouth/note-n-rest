import { format, isSameDay, isSameMonth } from "date-fns";

interface CalendarGridProps {
  // 현재 월의 모든 날짜 배열
  days: Date[];
  // 현재 선택된 날짜
  currentDate: Date;
  // 일기 엔트리 배열
  entries: { date: string; id: string }[];
  // 날짜 클릭 핸들러
  onDateClick: (date: string) => void;
}

export default function CalendarGrid({
  days,
  currentDate,
  entries,
  onDateClick,
}: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => {
        // 날짜 문자열 포맷팅
        const dateStr = format(day, "yyyy-MM-dd");
        // 해당 날짜에 일기가 있는지 확인
        const hasEntry = entries.some((entry) => entry.date === dateStr);
        // 오늘 날짜인지 확인
        const isToday = isSameDay(day, new Date());
        // 현재 월의 날짜인지 확인
        const isCurrentMonth = isSameMonth(day, currentDate);

        return (
          <div
            key={dateStr}
            onClick={() => onDateClick(dateStr)}
            className={`
              relative aspect-square flex flex-col items-center justify-center
              rounded-lg transition-all duration-200 cursor-pointer
              ${isCurrentMonth ? "hover:bg-[#FFFBEB]" : "text-gray-400"}
              ${isToday ? "ring-2 ring-[#FFE8A3]" : ""}
            `}
          >
            <span
              className={`text-sm ${
                isCurrentMonth ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {format(day, "d")}
            </span>
            {hasEntry && (
              <div className="absolute bottom-1 w-1 h-1 bg-gray-800 rounded-full" />
            )}
          </div>
        );
      })}
    </div>
  );
}
