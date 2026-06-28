import express from "express";
import { evaluateAnswer } from "../controllers/evaluationController.js";

const router = express.Router();

router.post("/evaluate", evaluateAnswer);

export default router;