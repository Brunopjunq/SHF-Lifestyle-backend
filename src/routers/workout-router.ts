import { Router } from "express";
import { getUserWorkouts, getWorkouts } from "../controllers/workout-controller.js";
import { validateToken } from "../middlewares/validate-token.js";

const workoutRouter = Router();

workoutRouter.all("/*", validateToken)
.get("/all", getWorkouts)
.get("/", getUserWorkouts);

export default workoutRouter;