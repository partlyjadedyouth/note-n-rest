import mongoose from "mongoose";
import { AppError } from "@/types/error";

// MongoDB 연결 상태를 저장할 변수
let isConnected = false;

export const connectDB = async () => {
  // 이미 연결된 경우 재연결하지 않음
  if (isConnected) {
    return;
  }

  try {
    // MongoDB URI가 환경변수에 없는 경우 에러 발생
    if (!process.env.MONGODB_URI) {
      throw new AppError("MongoDB URI가 설정되지 않았습니다.", 500);
    }

    // MongoDB에 연결
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("데이터베이스 연결에 실패했습니다.", 500);
  }
};

export default connectDB;
