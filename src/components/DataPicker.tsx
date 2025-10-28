import type { DateValue } from "@react-types/calendar";
import type { RangeValue } from "@react-types/shared";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { RangeCalendar } from "@heroui/react";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";

export default function DataPicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const [value] = useState<RangeValue<DateValue> | null>({
    start: startDate ? parseDate(startDate) : today(getLocalTimeZone()),
    end: endDate
      ? parseDate(endDate)
      : today(getLocalTimeZone()).add({ weeks: 1 }),
  });
  const handleDateChange = (value: RangeValue<DateValue> | null) => {
    const params = new URLSearchParams(searchParams);

    if (value?.start) {
      params.set("startDate", value.start.toString());
    } else {
      params.delete("startDate");
    }

    if (value?.end) {
      params.set("endDate", value.end.toString());
    } else {
      params.delete("endDate");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="p-4 bg-purple-50 rounded-lg flex justify-center">
      <RangeCalendar
        aria-label="Date (Controlled)"
        value={value}
        onChange={handleDateChange}
        className="text-purple-600"
        color="secondary"
        classNames={{
          base: "text-purple-600",
          content: "text-purple-600",
          cell: "text-purple-600",
        }}
      />
    </div>
  );
}
