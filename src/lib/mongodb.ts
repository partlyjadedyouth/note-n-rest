import mongoose from "mongoose";

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
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    // MongoDB에 연결
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
