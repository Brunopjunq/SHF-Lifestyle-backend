import { Router } from "express";
import { getFoodByName } from "../controllers/foods-controller.js";
import { validateToken } from "../middlewares/validate-token.js";

const foodsRouter = Router();

foodsRouter
.all("/*", validateToken)
.get("/:name", getFoodByName);

export default foodsRouter;