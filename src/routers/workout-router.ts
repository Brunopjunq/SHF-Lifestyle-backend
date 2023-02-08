import { Router } from "express";
import { deleteWorkout, deleteWorkoutExercise, getUserWorkouts, getUserWorkoutsExercise, getWorkouts, postWorkout, postWorkoutExercise, updateWorkout, updateWorkoutExercise } from "../controllers/workout-controller.js";
import { validateToken } from "../middlewares/validate-token.js";
import workoutsValidation from "../middlewares/validate-workouts.js";

const workoutRouter = Router();

workoutRouter.all("/*", validateToken)
.get("/all", getWorkouts)
.get("/", getUserWorkouts)
.post("/", workoutsValidation.validateWorkout , postWorkout)
.delete("/:workoutId", deleteWorkout)
.put("/:workoutId", updateWorkout)
.get("/:workoutId", getUserWorkoutsExercise)
.post("/:workoutId", workoutsValidation.validateWorkoutExercise, postWorkoutExercise)
.put("/exercise/:exerciseId", updateWorkoutExercise)
.delete("/exercise/:exerciseId", deleteWorkoutExercise);

export default workoutRouter;