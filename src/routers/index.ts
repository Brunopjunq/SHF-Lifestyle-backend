import { Router } from "express";
import userRouter from "./auth-router.js";
import workoutRouter from "./workout-router.js";

const router = Router();

router
.use("/auth", userRouter)
.use("/workout", workoutRouter)

export default router;