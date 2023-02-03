import { Router } from "express";
import { getWaterCount } from "../controllers/water-controller.js";
import { validateToken } from "../middlewares/validate-token.js";

const waterRouter = Router();

waterRouter
.all("/*", validateToken)
.get("/", getWaterCount)

export default waterRouter;