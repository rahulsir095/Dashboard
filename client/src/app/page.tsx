"use client";

import { useEffect, useState } from "react";
import { fetchOverview, fetchWeeklyTrends } from "@/lib/api";

import Topbar from "@/components/Topbar";
import InsightCards from "@/components/InsightCards";
import WeeklyActivityChart from "@/components/WeeklyChart";
import AIPulse from "@/components/AIPulse";
import TimeRangeToggle from "@/components/TimeRangeToggle";

import { TimeRange } from "@/types/timeRange";
import { Filters } from "@/types/filters";

export default function Dashboard() {
  const [overview, setOverview] = useState<any>(null);
  const [weekly, setWeekly] = useState<any[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [timeRange, setTimeRange] = useState<TimeRange>("week");
  const [loading, setLoading] = useState(false);

  /* 🔁 Refetch analytics when filters OR time range change */
  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetchOverview(filters, timeRange),
      fetchWeeklyTrends(filters, timeRange),
    ])
      .then(([overviewRes, weeklyRes]) => {
        setOverview(overviewRes);
        console.log("overviewRes trends:", overviewRes);
        setWeekly(weeklyRes.data);
      })
      .finally(() => setLoading(false));
  }, [filters, timeRange]);

  if (loading && !overview) {
    return <p className="p-6">Loading dashboard…</p>;
  }

  if (!overview) return null;

  return (
    <main className="p-8 space-y-8">
      {/* Topbar: Class + Subject + Theme */}
      <Topbar onFilterChange={setFilters} />

      {/* Insights header + Time range */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Insights</h2>
        <TimeRangeToggle
          value={timeRange}
          onChange={setTimeRange}
        />
      </div>

      {/* Stat Cards */}
      <InsightCards
        summary={overview.summary}
        teachers={overview.teachers}
        range={timeRange}
      />

      {/* Chart + AI Pulse */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <WeeklyActivityChart data={weekly} />
        </div>
        <AIPulse />
      </div>
    </main>
  );
}