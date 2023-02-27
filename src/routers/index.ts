import { Router } from "express";
import aerobicsRouter from "./aerobics-router.js";
import authRouter from "./auth-router.js";
import foodsRouter from "./foods-router.js";
import mealsRouter from "./meals-router.js";
import userRouter from "./user-router.js";
import waterRouter from "./water-router.js";
import weightRouter from "./weight-router.js";
import workoutRouter from "./workout-router.js";

const router = Router();

router
.use("/auth", authRouter)
.use("/workout", workoutRouter)
.use("/aerobics", aerobicsRouter)
.use("/water", waterRouter)
.use("/weight", weightRouter)
.use("/meals", mealsRouter)
.use("/foods", foodsRouter)
.use("/user", userRouter);

export default router;