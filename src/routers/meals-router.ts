import { Router } from "express";
import { deleteFoodByMeal, getMealsByDate, postFoodByMeal, postMeal } from "../controllers/meals-controller.js";
import mealsValidation from "../middlewares/validate-meal.js";
import { validateToken } from "../middlewares/validate-token.js";

const mealsRouter = Router();

mealsRouter
.all("/*", validateToken)
.get("/:date", getMealsByDate)
.post("/:date", mealsValidation.validateMeal, postMeal)
.post("/:date/:mealId/:foodId", postFoodByMeal)
.delete("/foodByMeal/:id", deleteFoodByMeal);

export default mealsRouter;