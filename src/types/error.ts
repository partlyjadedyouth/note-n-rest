/**
 * 애플리케이션 에러 타입 정의
 *
 * 커스텀 에러 클래스와 자주 사용되는 에러 타입들을 정의
 * 일관된 에러 처리와 상태 코드 관리를 위한 타입 시스템 제공
 */

// 커스텀 에러 클래스 정의
export class AppError extends Error {
  // HTTP 상태 코드를 저장하기 위한 속성
  statusCode: number;

  constructor(message: string, statusCode: number) {
    // 부모 클래스(Error)의 생성자 호출
    super(message);
    // 상태 코드 설정
    this.statusCode = statusCode;
    // 에러 이름을 'AppError'로 설정
    this.name = "AppError";
  }
}

// 자주 사용되는 에러 타입들을 상수 객체로 정의
export const ErrorTypes = {
  // 인증되지 않은 요청에 대한 에러 (401)
  UNAUTHORIZED: new AppError("인증되지 않은 사용자입니다.", 401),
  // 리소스를 찾을 수 없는 경우의 에러 (404)
  NOT_FOUND: new AppError("리소스를 찾을 수 없습니다.", 404),
  // 잘못된 요청에 대한 에러 (400)
  BAD_REQUEST: new AppError("잘못된 요청입니다.", 400),
  // 서버 내부 에러 (500)
  INTERNAL_SERVER: new AppError("서버 오류가 발생했습니다.", 500),
} as const;
