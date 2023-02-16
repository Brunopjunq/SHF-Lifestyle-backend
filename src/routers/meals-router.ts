import { Router } from "express";
import { getMealsByDate } from "../controllers/meals-controller.js";
import { validateToken } from "../middlewares/validate-token.js";

const mealsRouter = Router();

mealsRouter
.all("/*", validateToken)
.get("/:date", getMealsByDate);

export default mealsRouter;