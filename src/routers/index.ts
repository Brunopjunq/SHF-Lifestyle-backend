import { Router } from "express";
import userRouter from "./auth-router.js";
import workoutRouter from "./workout-router.js";

const router = Router();

router.use(workoutRouter);
router.use(userRouter);

export default router;