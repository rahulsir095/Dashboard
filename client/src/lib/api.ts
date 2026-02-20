import { Filters } from "@/types/filters";
import { TimeRange } from "@/types/timeRange";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in .env.local"
  );
}

/**
 * Fetch overview analytics (Stat cards + teacher table)
 */
export async function fetchOverview(
  filters: Filters,
  range: TimeRange
) {
  const params = new URLSearchParams();

  if (filters.class) params.append("class", filters.class);
  if (filters.subject) params.append("subject", filters.subject);
  params.append("range", range);

  const res = await fetch(
    `${API_BASE_URL}/api/analytics/overview?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch overview analytics");
  }

  return res.json();
}

/**
 * Fetch weekly activity trends (chart)
 */
export async function fetchWeeklyTrends(
  filters: Filters,
  range: TimeRange
) {
  const params = new URLSearchParams();

  if (filters.class) params.append("class", filters.class);
  if (filters.subject) params.append("subject", filters.subject);
  params.append("range", range);

  const res = await fetch(
    `${API_BASE_URL}/api/analytics/weekly?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weekly trends");
  }

  return res.json();
}

/**
 * Fetch available classes (grades)
 */
export async function fetchClasses() {
  const res = await fetch(
    `${API_BASE_URL}/api/meta/classes`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch classes");
  }

  return res.json();
}

/**
 * Fetch subjects (optionally filtered by class)
 */
export async function fetchSubjects(classValue?: string) {
  const url = classValue
    ? `${API_BASE_URL}/api/meta/subjects?class=${classValue}`
    : `${API_BASE_URL}/api/meta/subjects`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch subjects");
  }

  return res.json();
}

export const fetchClassroomsOverview = async (
  filters: Filters,
  range: TimeRange
) => {
  const params = new URLSearchParams();

  // Subject filter (Classrooms page does NOT send class)
  if (filters.subject) {
    params.append("subject", filters.subject);
  }

  // Time range
  params.append("range", range);

  const res = await fetch(
    `${API_BASE_URL}/api/analytics/classrooms?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch classrooms overview");
  }

  return res.json();
};