import express from "express";
import { generateInterviewQuestions } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/questions", generateInterviewQuestions);

export default router;