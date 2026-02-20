"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Topbar from "@/components/Topbar";
import TimeRangeToggle from "@/components/TimeRangeToggle";

import { fetchOverview } from "@/lib/api";
import { Filters } from "@/types/filters";
import { TimeRange } from "@/types/timeRange";

/* 🔹 Teacher summary type */
interface TeacherSummary {
  teacher_id: string;
  teacher_name: string;
  lesson: number;
  quiz: number;
  assessment: number;
  total: number;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<TeacherSummary[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [timeRange, setTimeRange] = useState<TimeRange>("week");
  const [loading, setLoading] = useState(false);

  /* 🔁 Fetch teacher analytics */
  useEffect(() => {
    setLoading(true);

    fetchOverview(filters, timeRange)
      .then((res) => {
        setTeachers(res.teachers || []);
      })
      .finally(() => setLoading(false));
  }, [filters, timeRange]);


  return (
    <main className="p-8 space-y-8">
      {/* Topbar: Class + Subject + Theme */}
      <Topbar onFilterChange={setFilters} />

      {/* Header + Time range */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Teachers</h2>
        <TimeRangeToggle value={timeRange} onChange={setTimeRange} />
      </div>

      {/* Teachers Table */}
      <div className="overflow-x-auto rounded-lg border bg-white dark:bg-gray-900">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">Teacher</th>
              <th className="p-3 text-center">Lessons</th>
              <th className="p-3 text-center">Quizzes</th>
              <th className="p-3 text-center">Assessments</th>
              <th className="p-3 text-center font-semibold">Total</th>
            </tr>
          </thead>

          <tbody>
            {teachers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500"
                >
                  No teachers found for selected filters
                </td>
              </tr>
            )}

            {teachers.map((t) => (
              <tr
                key={t.teacher_id}
                className="border-t dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="p-3 font-medium">
                  {t.teacher_name}
                </td>
                <td className="p-3 text-center">{t.lesson}</td>
                <td className="p-3 text-center">{t.quiz}</td>
                <td className="p-3 text-center">{t.assessment}</td>
                <td className="p-3 text-center font-semibold">
                  {t.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}