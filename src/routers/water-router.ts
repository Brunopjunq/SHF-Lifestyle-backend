import { Router } from "express";
import { getWaterCount, getWaterCountByDay, increaseWaterCount, postWaterCount } from "../controllers/water-controller.js";
import { validateToken } from "../middlewares/validate-token.js";

const waterRouter = Router();

waterRouter
.all("/*", validateToken)
.get("/", getWaterCount)
.get("/:date", getWaterCountByDay)
.post("/:date", postWaterCount)
.put("/:date/increase", increaseWaterCount);

export default waterRouter;