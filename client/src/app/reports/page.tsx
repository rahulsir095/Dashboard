"use client";

import Link from "next/link";
import { FileBarChart2, Clock } from "lucide-react";

export default function ReportsComingSoon() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center p-8">
      <div className="max-w-md w-full rounded-2xl border bg-white dark:bg-gray-900 p-8 text-center shadow-sm">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <FileBarChart2 className="h-7 w-7 text-blue-600 dark:text-blue-300" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">
          Reports Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We’re building detailed, exportable reports to help you
          analyze performance across teachers, classrooms, and subjects.
        </p>

        {/* Status */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
          <Clock className="h-4 w-4" />
          Under active development
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/classrooms"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            View Analytics
          </Link>
        </div>
      </div>
    </main>
  );
}