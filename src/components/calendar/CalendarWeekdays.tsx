// 요일 헤더를 표시하는 컴포넌트
export default function CalendarWeekdays() {
  // 요일 레이블 배열
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="grid grid-cols-7 gap-2 mb-2">
      {weekdays.map((day) => (
        <div
          key={day}
          className="text-center text-sm font-medium text-gray-600"
        >
          {day}
        </div>
      ))}
    </div>
  );
}
