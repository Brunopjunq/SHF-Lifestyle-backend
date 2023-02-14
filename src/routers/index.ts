import { Router } from "express";
import aerobicsRouter from "./aerobics-router.js";
import userRouter from "./auth-router.js";
import waterRouter from "./water-router.js";
import weightRouter from "./weight-router.js";
import workoutRouter from "./workout-router.js";

const router = Router();

router
.use("/auth", userRouter)
.use("/workout", workoutRouter)
.use("/aerobics", aerobicsRouter)
.use("/water", waterRouter)
.use("/weight", weightRouter);

export default router;