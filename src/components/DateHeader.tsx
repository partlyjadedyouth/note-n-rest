import { format, addDays, subDays } from "date-fns";
import { ko } from "date-fns/locale";

interface DateHeaderProps {
  date: string;
  onPrevDate?: () => void;
  onNextDate?: () => void;
}

export default function DateHeader({
  date,
  onPrevDate,
  onNextDate,
}: DateHeaderProps) {
  const currentDate = new Date(date);

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={onPrevDate}
        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
        disabled={!onPrevDate}
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
      <h2 className="text-lg font-semibold text-gray-800">
        {format(currentDate, "yyyy년 M월 d일", { locale: ko })}
      </h2>
      <button
        onClick={onNextDate}
        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
        disabled={!onNextDate}
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
