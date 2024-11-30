"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ko } from "date-fns/locale";

interface CalendarProps {
  entries: { date: string; id: string }[];
  onDateClick: (date: string) => void;
}

export default function Calendar({ entries, onDateClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-[#FFFBEB] rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800">
          {format(currentDate, "yyyy년 M월", { locale: ko })}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-[#FFFBEB] rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const hasEntry = entries.some((entry) => entry.date === dateStr);
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, currentDate);

          return (
            <div
              key={dateStr}
              onClick={() => onDateClick(dateStr)}
              className={`
                relative aspect-square flex flex-col items-center justify-center
                rounded-lg transition-all duration-200 cursor-pointer
                ${isCurrentMonth ? "hover:bg-[#FFFBEB]" : "text-gray-400"}
                ${isToday ? "ring-2 ring-[#FFE8A3]" : ""}
              `}
            >
              <span
                className={`text-sm ${
                  isCurrentMonth ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {format(day, "d")}
              </span>
              {hasEntry && (
                <div className="absolute bottom-1 w-1.5 h-1.5 bg-gray-800 rounded-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
