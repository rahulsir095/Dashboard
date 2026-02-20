import express from "express";

import {
  getOverviewAnalytics,
  getWeeklyTrendsAnalytics,
  getTeacherAnalyticsById,
} from "../controllers/analytics.controller.js";

import {
  getClassroomsAnalytics,
  getClassroomAnalyticsByClass,
} from "../controllers/classroomAnalytics.controller.js";

const router = express.Router();

// Overview of lessons, quizzes, assessments per teacher
router.get("/overview", getOverviewAnalytics);

// Weekly activity trends (for charts)
router.get("/weekly", getWeeklyTrendsAnalytics);

// Per-teacher detailed analytics
router.get("/teacher/:teacherId", getTeacherAnalyticsById);

// Classrooms overview analytics
router.get("/classrooms", getClassroomsAnalytics);


// Single classroom detailed analytics

router.get("/classrooms/:class", getClassroomAnalyticsByClass);

export default router;