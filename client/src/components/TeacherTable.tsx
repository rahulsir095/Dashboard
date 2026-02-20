type Teacher = {
  teacher_id: string;
  teacher_name: string;
  lesson: number;
  quiz: number;
  assessment: number;
  total: number;
};

export default function TeacherTable({
  teachers,
}: {
  teachers: Teacher[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 text-sm text-gray-600">
          <tr>
            <th className="p-3 text-left">Teacher</th>
            <th>Lessons</th>
            <th>Quizzes</th>
            <th>Assessments</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr
              key={t.teacher_id}
              className="border-t text-center hover:bg-gray-50"
            >
              <td className="p-3 text-left font-medium">
                {t.teacher_name}
              </td>
              <td>{t.lesson}</td>
              <td>{t.quiz}</td>
              <td>{t.assessment}</td>
              <td className="font-semibold">{t.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}