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

// API 응답 관련 타입
export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
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
