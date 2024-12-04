import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface CalendarHeaderProps {
  // 현재 선택된 날짜
  currentDate: Date;
  // 이전 달로 이동하는 함수
  onPrevMonth: () => void;
  // 다음 달로 이동하는 함수
  onNextMonth: () => void;
}

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={onPrevMonth}
        className="p-2 hover:bg-[#FFFBEB] rounded-lg transition-colors"
      >
        <svg
          className="w-6 h-6 text-gray-600"
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
      <h2 className="text-xl font-bold text-gray-800">
        {format(currentDate, "yyyy년 M월", { locale: ko })}
      </h2>
      <button
        onClick={onNextMonth}
        className="p-2 hover:bg-[#FFFBEB] rounded-lg transition-colors"
      >
        <svg
          className="w-6 h-6 text-gray-600"
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
