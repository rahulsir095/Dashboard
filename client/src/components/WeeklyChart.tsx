"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Weekly = {
  week: string;
  lesson: number;
  quiz: number;
  assessment: number;
};

export default function WeeklyChart({ data }: { data: Weekly[] }) {
  return (
    <div
      className="
        rounded-xl p-6 border
        bg-white dark:bg-zinc-900
        border-zinc-200 dark:border-zinc-800
        shadow-sm
      "
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Activity
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Content creation trends
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:stroke-zinc-700"
          />

          {/* X Axis */}
          <XAxis
            dataKey="week"
            tick={{ fill: "#52525b", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
            className="dark:[&_*]:fill-zinc-400 dark:[&_.recharts-cartesian-axis-line]:stroke-zinc-700"
          />

          {/* Y Axis */}
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#52525b", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
            className="dark:[&_*]:fill-zinc-400 dark:[&_.recharts-cartesian-axis-line]:stroke-zinc-700"
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              color: "#18181b",
            }}
            labelStyle={{ color: "#71717a" }}
            wrapperClassName="dark:!bg-zinc-900 dark:!border-zinc-700 dark:!text-zinc-100"
          />

          {/* Legend */}
          <Legend
            wrapperStyle={{
              color: "#52525b",
              fontSize: "12px",
            }}
          />

          {/* Lines */}
          <Line
            type="monotone"
            dataKey="lesson"
            stroke="#6366f1" // Indigo
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="quiz"
            stroke="#22c55e" // Green
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="assessment"
            stroke="#ef4444" // Red
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}