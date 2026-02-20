import {
  getClassroomsOverview,
  getClassroomDetails,
} from "../models/classroomAnalytics.model.js";


 // GET /api/analytics/classrooms

export const getClassroomsAnalytics = async (req, res) => {
  try {
    const { subject, range = "week" } = req.query;

    const data = await getClassroomsOverview({
      subject,
      range: range.toLowerCase(),
    });

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Classrooms analytics error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch classrooms analytics",
    });
  }
};


//  GET /api/analytics/classrooms/:class
//   Single classroom details

export const getClassroomAnalyticsByClass = async (req, res) => {
  try {
    const { class: classValue } = req.params;
    const { range = "week" } = req.query;

    const data = await getClassroomDetails({
      classValue,
      range: range.toLowerCase(),
    });

    res.json({
      success: true,
      ...data,
    });
  } catch (err) {
    console.error("Classroom detail error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch classroom analytics",
    });
  }
};