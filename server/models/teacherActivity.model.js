import pool from "../config/db.js";
import { getDateRange } from "./utils/dateRange.js";

// Dynamic WHERE builder (core logic)
const applyFilters = ({ classValue, subject, range }, values) => {
  let where = "";
  let idx = values.length + 1;

  if (classValue) {
    where += ` AND class = $${idx++}`;
    values.push(Number(classValue));
  }

  if (subject) {
    where += ` AND subject = $${idx++}`;
    values.push(subject);
  }

  if (range) {
    const { start, end } = getDateRange(range);
    where += ` AND created_at BETWEEN $${idx} AND $${idx + 1}`;
    values.push(start, end);
  }

  return where;
};

//SUMMARY CARDS
export const getOverviewStats = async (filters) => {
  const values = [];
  let query = `
    SELECT
      COUNT(*) FILTER (WHERE activity_type = 'lesson')::INT AS lesson,
      COUNT(*) FILTER (WHERE activity_type = 'quiz')::INT AS quiz,
      COUNT(*) FILTER (WHERE activity_type = 'assessment')::INT AS assessment
    FROM teacher_activities
    WHERE 1=1
  `;

  query += applyFilters(filters, values);

  const { rows } = await pool.query(query, values);
  return rows[0];
};
// TEACHER TABLE

export const getTeacherOverviewStats = async (filters) => {
  const values = [];
  let query = `
    SELECT
      teacher_id,
      teacher_name,
      activity_type,
      COUNT(*)::INT AS total
    FROM teacher_activities
    WHERE 1=1
  `;

  query += applyFilters(filters, values);

  query += `
    GROUP BY teacher_id, teacher_name, activity_type
    ORDER BY teacher_name
  `;

  const { rows } = await pool.query(query, values);
  return rows;
};

// WEEKLY TRENDS
export const getWeeklyActivityTrends = async (filters) => {
  const values = [];
  let query = `
    SELECT
      DATE_TRUNC('week', created_at) AS week,
      activity_type,
      COUNT(*)::INT AS total
    FROM teacher_activities
    WHERE 1=1
  `;

  query += applyFilters(filters, values);

  query += `
    GROUP BY week, activity_type
    ORDER BY week
  `;

  const { rows } = await pool.query(query, values);
  return rows;
};

// PER TEACHER SUMMARY
export const getTeacherStatsById = async (teacherId) => {
  const query = `
    SELECT
      teacher_name,
      activity_type,
      COUNT(*)::INT AS total
    FROM teacher_activities
    WHERE teacher_id = $1
    GROUP BY teacher_name, activity_type
  `;
  const { rows } = await pool.query(query, [teacherId]);
  return rows;
};


// PER TEACHER WEEKLY

export const getWeeklyTrendsByTeacher = async (teacherId) => {
  const query = `
    SELECT
      DATE_TRUNC('week', created_at) AS week,
      activity_type,
      COUNT(*)::INT AS total
    FROM teacher_activities
    WHERE teacher_id = $1
    GROUP BY week, activity_type
    ORDER BY week
  `;
  const { rows } = await pool.query(query, [teacherId]);
  return rows;
};