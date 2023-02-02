import { Router } from "express";
import aerobicsRouter from "./aerobics-router.js";
import userRouter from "./auth-router.js";
import workoutRouter from "./workout-router.js";

const router = Router();

router
.use("/auth", userRouter)
.use("/workout", workoutRouter)
.use("/aerobics", aerobicsRouter)

export default router;