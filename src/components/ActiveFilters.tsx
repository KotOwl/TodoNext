"use client";

import { Chip } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { EventTypeLabel } from "@/types/IEvents";
import { parseDate } from "@internationalized/date";

export default function ActiveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilters: Array<{ key: string; label: string }> = [];

  // Check for title filter
  const title = searchParams.get("title");
  if (title) {
    activeFilters.push({ key: "title", label: `Name: ${title}` });
  }

  // Check for type filter
  const type = searchParams.get("type");
  if (type && EventTypeLabel[type as keyof typeof EventTypeLabel]) {
    activeFilters.push({
      key: "type",
      label: `Type: ${EventTypeLabel[type as keyof typeof EventTypeLabel]}`,
    });
  }

  // Check for date filters
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  if (startDate && endDate) {
    try {
      const start = parseDate(startDate);
      const end = parseDate(endDate);
      activeFilters.push({
        key: "dates",
        label: `Dates: ${start.toString()} - ${end.toString()}`,
      });
    } catch (e) {
      // If date parsing fails, skip
    }
  } else if (startDate) {
    try {
      const start = parseDate(startDate);
      activeFilters.push({
        key: "startDate",
        label: `From: ${start.toString()}`,
      });
    } catch (e) {
      // If date parsing fails, skip
    }
  } else if (endDate) {
    try {
      const end = parseDate(endDate);
      activeFilters.push({
        key: "endDate",
        label: `Until: ${end.toString()}`,
      });
    } catch (e) {
      // If date parsing fails, skip
    }
  }

  const handleRemoveFilter = (filterKey: string) => {
    const params = new URLSearchParams(searchParams);

    if (filterKey === "dates") {
      params.delete("startDate");
      params.delete("endDate");
    } else {
      params.delete(filterKey);
    }

    router.replace(`/events?${params.toString()}`, { scroll: false });
  };

  const handleClearAll = () => {
    router.replace("/events", { scroll: false });
  };

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="w-full p-4 bg-purple-50 rounded-lg border border-purple-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-purple-800">
          Active Filters ({activeFilters.length})
        </h3>
        {activeFilters.length > 1 && (
          <button
            onClick={handleClearAll}
            className="text-xs text-purple-600 hover:text-purple-800 underline"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <Chip
            key={filter.key}
            onClose={() => handleRemoveFilter(filter.key)}
            variant="flat"
            color="secondary"
            className="bg-purple-200 text-purple-900"
          >
            {filter.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
