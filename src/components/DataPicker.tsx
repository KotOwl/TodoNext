import type { DateValue } from "@react-types/calendar";
import type { RangeValue } from "@react-types/shared";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { RangeCalendar } from "@heroui/react";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";

export default function DataPicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  // Derive the value directly from URL parameters instead of maintaining separate state
  const value: RangeValue<DateValue> | null = {
    start: startDate ? parseDate(startDate) : today(getLocalTimeZone()),
    end: endDate
      ? parseDate(endDate)
      : today(getLocalTimeZone()).add({ weeks: 1 }),
  };

  const handleDateChange = useMemo(() => { return (newValue: RangeValue<DateValue> | null) => {
    const params = new URLSearchParams(searchParams);

    
      if (newValue?.start) {
      params.set("startDate", newValue.start.toString());
    } else {
      params.delete("startDate");
    }

    if (newValue?.end) {
      params.set("endDate", newValue.end.toString());
    } else {
      params.delete("endDate");
    };

     router.replace(`?${params.toString()}`, { scroll: false });
  };}, [searchParams, router]);

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border-2 border-purple-200 shadow-lg flex justify-center">
      <div className="w-full max-w-md">
        <RangeCalendar
          aria-label="Date Range Selection"
          value={value}
          onChange={handleDateChange}
          className="text-purple-600 w-full"
          color="secondary"
          classNames={{
            base: "text-purple-600 w-full",
            content: "text-purple-600 w-full",
            cell: "text-purple-600 hover:bg-purple-100 data-[selected]:bg-purple-500 data-[selected]:text-white",
          }}
        />
      </div>
    </div>
  );
}
