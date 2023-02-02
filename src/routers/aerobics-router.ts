import { Router } from "express";
import { getUserAerobics } from "../controllers/aerobics-controller.js";
import { validateToken } from "../middlewares/validate-token.js";

const aerobicsRouter = Router();

aerobicsRouter
.all("/*", validateToken)
.get("/", getUserAerobics);

export default aerobicsRouter;