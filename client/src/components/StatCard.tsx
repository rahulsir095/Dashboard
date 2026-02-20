import { TimeRange } from "@/types/timeRange";

type Props = {
  title: string;
  value: number;
  range: TimeRange;
};

export default function StatCard({ title, value, range }: Props) {
  const rangeLabel =
    range === "week"
      ? "This week"
      : range === "month"
      ? "This month"
      : "This year";

  return (
    <div className="rounded-xl p-5 bg-card border border-border shadow-sm">
      <p className="text-sm text-muted">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-xs text-muted mt-1">{rangeLabel}</p>
    </div>
  );
}