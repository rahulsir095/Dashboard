import StatCard from "@/components/StatCard";
import { TimeRange } from "@/types/timeRange";

type Summary = {
  lesson: number;
  quiz: number;
  assessment: number;
  total: number;
  activeTeachers: number;
};

type Props = {
  summary: Summary;
  teachers: any[];
  range: TimeRange;
};


export default function InsightCards({
  summary,
  teachers,
  range,
  
}: Props) {
  // console.log("Summary:", summary);
  return (
    <div className="grid grid-cols-5 gap-4">
      <StatCard
        title="Active Teachers"
        value={summary.activeTeachers ?? teachers.length}
        range={range}
      />

      <StatCard
        title="Lessons Created"
        value={summary.lesson}
        range={range}
      />

      <StatCard
        title="Assessments Made"
        value={summary.assessment}
        range={range}
      />

      <StatCard
        title="Quizzes Conducted"
        value={summary.quiz}
        range={range}
      />

      <StatCard
        title="Total Activities"
        value={summary.quiz + summary.lesson + summary.assessment}
        range={range}
      />
    </div>
  );
}