import { Router } from "express";
import workoutRouter from "./workout-router.js";

const router = Router();

router.use(workoutRouter);

export default router;