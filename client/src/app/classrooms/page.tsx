"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Topbar from "@/components/Topbar";
import TimeRangeToggle from "@/components/TimeRangeToggle";

import { fetchClassroomsOverview } from "@/lib/api";
import { Filters } from "@/types/filters";
import { TimeRange } from "@/types/timeRange";

/* 🔹 Classroom summary type */
interface ClassroomSummary {
  class: string;
  lesson: number;
  quiz: number;
  assessment: number;
  total: number;
  teachers: number;
  subjects: number;
}

export default function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState<ClassroomSummary[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [timeRange, setTimeRange] = useState<TimeRange>("week");
  const [loading, setLoading] = useState(false);

  /* 🔁 Fetch classrooms analytics */
  useEffect(() => {
    setLoading(true);

    fetchClassroomsOverview(filters, timeRange)
      .then((res) => {
        setClassrooms(res.data || []);
      })
      .finally(() => setLoading(false));
  }, [filters, timeRange]);

  return (
    <main className="p-8 space-y-8">
      {/* Topbar: Subject + Theme (NO class filter here) */}
      <Topbar onFilterChange={setFilters} hideClassFilter />

      {/* Header + Time range */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Classrooms</h2>
        <TimeRangeToggle value={timeRange} onChange={setTimeRange} />
      </div>

      {/* Classrooms Table */}
      <div className="overflow-x-auto rounded-lg border bg-white dark:bg-gray-900">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-center">Lessons</th>
              <th className="p-3 text-center">Quizzes</th>
              <th className="p-3 text-center">Assessments</th>
              <th className="p-3 text-center font-semibold">Total</th>
              <th className="p-3 text-center">Teachers</th>
              <th className="p-3 text-center">Subjects</th>
            </tr>
          </thead>

          <tbody>
            {classrooms.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="p-6 text-center text-gray-500"
                >
                  No classrooms found for selected range
                </td>
              </tr>
            )}

            {classrooms.map((c) => (
              <tr
                key={c.class}
                className="border-t dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="p-3 font-medium">
                  Class {c.class}
                </td>
                <td className="p-3 text-center">{c.lesson}</td>
                <td className="p-3 text-center">{c.quiz}</td>
                <td className="p-3 text-center">{c.assessment}</td>
                <td className="p-3 text-center font-semibold">
                  {c.total}
                </td>
                <td className="p-3 text-center">{c.teachers}</td>
                <td className="p-3 text-center">{c.subjects}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}