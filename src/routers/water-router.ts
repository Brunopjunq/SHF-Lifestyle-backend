import { Router } from "express";
import { getWaterCount, getWaterCountByDay, postWaterCount } from "../controllers/water-controller.js";
import { validateToken } from "../middlewares/validate-token.js";

const waterRouter = Router();

waterRouter
.all("/*", validateToken)
.get("/", getWaterCount)
.get("/:date", getWaterCountByDay)
.post("/:date", postWaterCount);

export default waterRouter;