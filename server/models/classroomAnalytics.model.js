import { getDateRange } from "./utils/dateRange.js";
import pool from "../config/db.js";
export const getClassroomsOverview = async ({ subject, range }) => {
  const values = [];
  let idx = 1;

  let query = `
    SELECT
      class,
      COUNT(*) FILTER (WHERE activity_type = 'lesson')::INT AS lesson,
      COUNT(*) FILTER (WHERE activity_type = 'quiz')::INT AS quiz,
      COUNT(*) FILTER (WHERE activity_type = 'assessment')::INT AS assessment,
      COUNT(*)::INT AS total,
      COUNT(DISTINCT teacher_id)::INT AS teachers,
      COUNT(DISTINCT subject)::INT AS subjects
    FROM teacher_activities
    WHERE 1=1
  `;

  if (subject) {
    query += ` AND subject = $${idx++}`;
    values.push(subject);
  }

  if (range) {
    const { start, end } = getDateRange(range);
    query += ` AND created_at BETWEEN $${idx} AND $${idx + 1}`;
    values.push(start, end);
  }

  query += `
    GROUP BY class
    ORDER BY class
  `;

  const { rows } = await pool.query(query, values);
  return rows;
};

export const getClassroomDetails = async ({ classValue, range }) => {
  const { start, end } = getDateRange(range);

  /*  Summary */
  const summaryQuery = `
    SELECT
      COUNT(*) FILTER (WHERE activity_type='lesson')::INT AS lesson,
      COUNT(*) FILTER (WHERE activity_type='quiz')::INT AS quiz,
      COUNT(*) FILTER (WHERE activity_type='assessment')::INT AS assessment,
      COUNT(*)::INT AS total
    FROM teacher_activities
    WHERE class = $1
      AND created_at BETWEEN $2 AND $3
  `;

  /*  Subject breakdown */
  const subjectQuery = `
    SELECT
      subject,
      COUNT(*)::INT AS total
    FROM teacher_activities
    WHERE class = $1
      AND created_at BETWEEN $2 AND $3
    GROUP BY subject
    ORDER BY total DESC
  `;

  /*  Teacher contribution */
  const teacherQuery = `
    SELECT
      teacher_id,
      teacher_name,
      COUNT(*)::INT AS total
    FROM teacher_activities
    WHERE class = $1
      AND created_at BETWEEN $2 AND $3
    GROUP BY teacher_id, teacher_name
    ORDER BY total DESC
  `;

  /*  Weekly trends */
  const weeklyQuery = `
    SELECT
      DATE_TRUNC('week', created_at) AS week,
      COUNT(*)::INT AS total
    FROM teacher_activities
    WHERE class = $1
      AND created_at BETWEEN $2 AND $3
    GROUP BY week
    ORDER BY week
  `;

  const [summary, subjects, teachers, weekly] = await Promise.all([
    pool.query(summaryQuery, [classValue, start, end]),
    pool.query(subjectQuery, [classValue, start, end]),
    pool.query(teacherQuery, [classValue, start, end]),
    pool.query(weeklyQuery, [classValue, start, end]),
  ]);

  return {
    class: classValue,
    summary: summary.rows[0],
    subjects: subjects.rows,
    teachers: teachers.rows,
    weeklyTrends: weekly.rows,
  };
};