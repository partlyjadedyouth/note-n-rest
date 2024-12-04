// BackButton 컴포넌트: 뒤로가기 버튼을 표시하는 재사용 가능한 컴포넌트
// onClick 핸들러를 props로 받아 클릭 이벤트를 처리함
export default function BackButton({
  onClick,
  className = "",
}: {
  // 클릭 이벤트 핸들러 함수 타입 정의
  onClick: () => void;
  // 추가 스타일링을 위한 선택적 className prop
  className?: string;
}) {
  return (
    <button
      // onClick 이벤트 핸들러 연결
      onClick={onClick}
      // 기본 스타일과 추가된 className을 결합
      className={`hover:bg-white rounded-lg transition-colors ${className}`}
    >
      <svg
        className="w-full h-full text-gray-600"
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
  );
}
