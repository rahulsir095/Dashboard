import {
  getOverviewStats,
  getTeacherOverviewStats,
  getWeeklyActivityTrends,
  getWeeklyTrendsByTeacher,
  getTeacherStatsById,
} from "../models/teacherActivity.model.js";


// GET /api/analytics/overview

export const getOverviewAnalytics = async (req, res) => {
  try {
    const { class: classValue, subject, range = "week" } = req.query;

    const filters = {
      classValue,
      subject,
      range: range.toLowerCase(),
    };

    //  Summary cards
    const summary = await getOverviewStats(filters);

    // Teacher table
    const rows = await getTeacherOverviewStats(filters);

    const teacherMap = {};

    rows.forEach(({ teacher_id, teacher_name, activity_type, total }) => {
      if (!teacherMap[teacher_id]) {
        teacherMap[teacher_id] = {
          teacher_id,
          teacher_name,
          lesson: 0,
          quiz: 0,
          assessment: 0,
          total: 0,
        };
      }

      teacherMap[teacher_id][activity_type] = Number(total);
      teacherMap[teacher_id].total += Number(total);
    });

    res.json({
      success: true,
      summary,
      teachers: Object.values(teacherMap),
    });
  } catch (err) {
    console.error("Overview analytics error:", err);
    res.status(500).json({ success: false, message: "Overview failed" });
  }
};


// GET /api/analytics/weekly

export const getWeeklyTrendsAnalytics = async (req, res) => {
  try {
    const { class: classValue, subject, range = "week" } = req.query;

    const rows = await getWeeklyActivityTrends({
      classValue,
      subject,
      range: range.toLowerCase(),
    });

    const weekMap = {};

    rows.forEach(({ week, activity_type, total }) => {
      if (!weekMap[week]) {
        weekMap[week] = {
          week,
          lesson: 0,
          quiz: 0,
          assessment: 0,
        };
      }
      weekMap[week][activity_type] = Number(total);
    });

    res.json({
      success: true,
      data: Object.values(weekMap),
    });
  } catch (err) {
    console.error("Weekly trends error:", err);
    res.status(500).json({ success: false, message: "Weekly trends failed" });
  }
};


 // GET /api/analytics/teacher/:teacherId

export const getTeacherAnalyticsById = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const summaryRows = await getTeacherStatsById(teacherId);
    if (!summaryRows.length) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    const summary = {
      lesson: 0,
      quiz: 0,
      assessment: 0,
      total: 0,
    };

    summaryRows.forEach(({ activity_type, total }) => {
      summary[activity_type] += Number(total);
      summary.total += Number(total);
    });

    const weeklyRows = await getWeeklyTrendsByTeacher(teacherId);
    const weekMap = {};

    weeklyRows.forEach(({ week, activity_type, total }) => {
      if (!weekMap[week]) {
        weekMap[week] = {
          week,
          lesson: 0,
          quiz: 0,
          assessment: 0,
        };
      }
      weekMap[week][activity_type] = Number(total);
    });

    res.json({
      success: true,
      teacher: {
        teacher_id: teacherId,
        teacher_name: summaryRows[0].teacher_name,
      },
      summary,
      weeklyTrends: Object.values(weekMap),
    });
  } catch (err) {
    console.error("Teacher analytics error:", err);
    res.status(500).json({ success: false, message: "Teacher analytics failed" });
  }
};