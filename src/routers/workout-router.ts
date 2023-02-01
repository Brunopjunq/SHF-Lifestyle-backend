import { Router } from "express";
import { getUserWorkouts, getWorkouts, postWorkout } from "../controllers/workout-controller.js";
import { validateToken } from "../middlewares/validate-token.js";
import workoutsValidation from "../middlewares/validate-workouts.js";

const workoutRouter = Router();

workoutRouter.all("/*", validateToken)
.get("/all", getWorkouts)
.get("/", getUserWorkouts)
.post("/", workoutsValidation.validateWorkout , postWorkout);

export default workoutRouter;