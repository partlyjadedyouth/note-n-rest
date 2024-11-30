import mongoose from "mongoose";

const DiarySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  music: {
    title: String,
    artist: String,
    url: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// userId와 date의 조합이 유니크하도록 설정
DiarySchema.index({ userId: 1, date: 1 }, { unique: true });

export const Diary =
  mongoose.models.Diary || mongoose.model("Diary", DiarySchema);
