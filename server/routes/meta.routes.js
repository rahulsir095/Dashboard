import express from "express";
import { getClasses, getSubjects } from "../controllers/meta.controller.js";

const router = express.Router();

router.get("/classes", getClasses);
router.get("/subjects", getSubjects);

export default router;