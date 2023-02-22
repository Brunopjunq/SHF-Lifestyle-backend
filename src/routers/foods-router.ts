import { Router } from "express";
import { getFoodByName, postFood } from "../controllers/foods-controller.js";
import foodValidation from "../middlewares/validate-food.js";
import { validateToken } from "../middlewares/validate-token.js";

const foodsRouter = Router();

foodsRouter
.all("/*", validateToken)
.get("/:name", getFoodByName)
.post("/", foodValidation.validateFood, postFood);

export default foodsRouter;