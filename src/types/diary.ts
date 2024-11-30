export interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiaryDocument {
  _id: { toString(): string };
  date: string;
  content: string;
  mood?: string;
}

export interface DiaryInput {
  content: string;
  mood?: string;
}

export interface DiaryResponse {
  success: boolean;
  data?: DiaryEntry;
  error?: string;
}

export interface DiaryEntriesResponse {
  success: boolean;
  data?: DiaryEntry[];
  error?: string;
}
