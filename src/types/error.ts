export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

export const ErrorTypes = {
  UNAUTHORIZED: new AppError("인증되지 않은 사용자입니다.", 401),
  NOT_FOUND: new AppError("리소스를 찾을 수 없습니다.", 404),
  BAD_REQUEST: new AppError("잘못된 요청입니다.", 400),
  INTERNAL_SERVER: new AppError("서버 오류가 발생했습니다.", 500),
} as const;
