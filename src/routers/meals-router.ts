import { Router } from "express";
import { getMealsByDate, postMeal } from "../controllers/meals-controller.js";
import mealsValidation from "../middlewares/validate-meal.js";
import { validateToken } from "../middlewares/validate-token.js";

const mealsRouter = Router();

mealsRouter
.all("/*", validateToken)
.get("/:date", getMealsByDate)
.post("/:date", mealsValidation.validateMeal, postMeal);

export default mealsRouter;