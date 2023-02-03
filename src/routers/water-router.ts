import { Router } from "express";
import { getWaterCount, getWaterCountByDay } from "../controllers/water-controller.js";
import { validateToken } from "../middlewares/validate-token.js";

const waterRouter = Router();

waterRouter
.all("/*", validateToken)
.get("/", getWaterCount)
.get("/:date", getWaterCountByDay);

export default waterRouter;