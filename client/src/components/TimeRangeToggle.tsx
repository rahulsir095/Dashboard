"use client";

import { TimeRange } from "@/types/timeRange";

const ranges: { label: string; value: TimeRange }[] = [
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

export default function TimeRangeToggle({
  value,
  onChange,
}: {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}) {
  return (
    <div className="flex items-center bg-card border border-border rounded-xl p-1 shadow-sm">
      {ranges.map((r) => (
        <button
          key={r.value}
          onClick={() => onChange(r.value)}
          className={`px-4 py-2 text-sm rounded-lg transition ${
            value === r.value
              ? "bg-purple-100 text-purple-700 font-medium"
              : "text-muted hover:bg-muted/20"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}