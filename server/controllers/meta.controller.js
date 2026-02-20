import pool from "../config/db.js";


  // GET /api/meta/classes
  // Returns distinct classes (1–10)

export async function getClasses(req, res) {
  const result = await pool.query(`
    SELECT DISTINCT class
    FROM teacher_activities
    ORDER BY class
  `);

  res.json({
    success: true,
    data: result.rows.map(r => r.class),
  });
}


  // GET /api/meta/subjects?class=7
  // Returns subjects for a given class

export async function getSubjects(req, res) {
  const { class: classValue } = req.query;

  let query = `
    SELECT DISTINCT subject
    FROM teacher_activities
  `;
  const values = [];

  if (classValue) {
    query += ` WHERE class = $1`;
    values.push(classValue);
  }

  query += ` ORDER BY subject`;

  const result = await pool.query(query, values);

  res.json({
    success: true,
    data: result.rows.map(r => r.subject),
  });
}