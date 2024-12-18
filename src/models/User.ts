import mongoose from "mongoose";
import { IUser } from "@/types";

// User 스키마 정의
const UserSchema = new mongoose.Schema<IUser>({
  // 사용자 ID (unique로 설정하여 중복 방지)
  userId: { type: String, required: true, unique: true },
  // 비밀번호 (실제 운영환경에서는 반드시 해시화하여 저장)
  password: { type: String, required: true },
  // 사용자 이름
  name: { type: String, required: true },
});

// 모델이 이미 존재하는 경우 재사용, 없는 경우 새로 생성
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
