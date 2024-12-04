/**
 * 캘린더 요일 표시 컴포넌트
 *
 * 캘린더의 상단에 요일을 표시하는 컴포넌트
 * 일요일부터 토요일까지의 요일을 그리드 형태로 표시
 */

// 요일 배열 정의 (일요일부터 토요일까지)
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function CalendarWeekdays() {
  return (
    // 요일을 표시할 그리드 컨테이너
    <div className="grid grid-cols-7 gap-1 mb-1">
      {/* WEEKDAYS 배열을 순회하며 각 요일 표시 */}
      {WEEKDAYS.map((day) => (
        <div
          key={day}
          // 각 요일 셀의 스타일링
          className="h-8 flex items-center justify-center text-sm text-gray-500"
        >
          {day}
        </div>
      ))}
    </div>
  );
}
