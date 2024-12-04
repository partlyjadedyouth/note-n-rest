// 일기 엔트리 관련 타입
export interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 사용자 관련 타입
export interface IUser {
  userId: string;
  password: string;
  name: string;
}

// 캘린더 컴포넌트 props 타입
export interface CalendarProps {
  entries: {
    date: string;
    id: string;
  }[];
  onDateClick: (date: string) => void;
}

// MongoDB 문서 타입 정의
export interface DiaryDocument {
  _id: { toString(): string };
  date: string;
}

// 그리드 컴포넌트의 props 타입 정의
export interface CalendarGridProps {
  days: Date[];
  currentDate: Date;
  entries: {
    date: string;
    id: string;
  }[];
  onDateClick: (date: string) => void;
}

// 헤더 컴포넌트의 props 타입 정의
export interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}
