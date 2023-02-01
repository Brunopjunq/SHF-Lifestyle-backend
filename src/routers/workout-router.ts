import { Router } from "express";
import { deleteWorkout, getUserWorkouts, getUserWorkoutsExercise, getWorkouts, postWorkout, updateWorkout } from "../controllers/workout-controller.js";
import { validateToken } from "../middlewares/validate-token.js";
import workoutsValidation from "../middlewares/validate-workouts.js";

const workoutRouter = Router();

workoutRouter.all("/*", validateToken)
.get("/all", getWorkouts)
.get("/", getUserWorkouts)
.post("/", workoutsValidation.validateWorkout , postWorkout)
.delete("/:workoutId", deleteWorkout)
.put("/:workoutId", updateWorkout)
.get("/:workoutId", getUserWorkoutsExercise);

export default workoutRouter;