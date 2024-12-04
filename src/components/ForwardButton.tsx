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
      onClick={onClick}
      className={`hover:bg-gray-100 rounded-lg transition-colors ${className}`}
    >
      <svg
        className="w-full h-fulltext-gray-600"
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
  );
}
