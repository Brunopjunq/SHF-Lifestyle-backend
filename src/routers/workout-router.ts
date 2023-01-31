import { Router } from "express";
import { getWorkouts } from "../controllers/workout-controller.js";

const workoutRouter = Router();

workoutRouter.get('/workouts', getWorkouts);

export default workoutRouter;