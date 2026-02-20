"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { fetchClasses, fetchSubjects } from "@/lib/api";

type Filters = {
  class?: string;
  subject?: string;
};

export default function Topbar({
  onFilterChange,
}: {
  onFilterChange: (filters: Filters) => void;
  hideClassFilter?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [classes, setClasses] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [classValue, setClassValue] = useState("");
  const [subject, setSubject] = useState("");

  /* Avoid hydration mismatch */
  useEffect(() => setMounted(true), []);

  /* Fetch classes (1–10) */
  useEffect(() => {
    fetchClasses().then(res => setClasses(res.data));
  }, []);

  /* Fetch subjects when class changes */
  useEffect(() => {
    fetchSubjects(classValue).then(res => setSubjects(res.data));
  }, [classValue]);

  /* Notify parent (Dashboard) */
  useEffect(() => {
    onFilterChange({
      class: classValue || undefined,
      subject: subject || undefined,
    });
  }, [classValue, subject]);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-between mb-8">
      {/* Left: Title */}
      <div>
        <h2 className="text-xl font-semibold">Admin Companion</h2>
        <p className="text-sm text-muted">
          See what’s happening across your school
        </p>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        {/* Class Dropdown */}
        <select
          className="border border-border rounded-full px-3 py-2 text-sm bg-card"
          value={classValue}
          onChange={(e) => {
            setClassValue(e.target.value);
            setSubject("");
          }}
        >
          <option value="">All Classes</option>
          {classes.map((c) => (
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}
        </select>

        {/* Subject Dropdown */}
        <select
          className="border border-border rounded-full px-3 py-2 text-sm bg-card"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Theme Toggle */}
        <button
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          className="p-2 rounded-full border border-border bg-card hover:bg-muted transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>
      </div>
    </div>
  );
}