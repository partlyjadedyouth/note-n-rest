"use client";

import { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { CalendarProps } from "@/types";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarWeekdays from "@/components/calendar/CalendarWeekdays";
import CalendarGrid from "@/components/calendar/CalendarGrid";

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
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />
      <CalendarWeekdays />
      <CalendarGrid
        days={days}
        currentDate={currentDate}
        entries={entries}
        onDateClick={onDateClick}
      />
    </div>
  );
}
