export interface Music {
  title: string;
  artist: string;
  url: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
  music?: Music;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiaryDocument {
  _id: { toString(): string };
  date: string;
  content: string;
  mood?: string;
  music?: Music;
}

export interface DiaryInput {
  content: string;
  mood?: string;
  music?: Music;
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
