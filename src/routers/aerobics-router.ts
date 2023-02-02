import { Router } from "express";
import { getUserAerobics, postAerobics } from "../controllers/aerobics-controller.js";
import aerobicValidation from "../middlewares/validate-aerobics.js";
import { validateToken } from "../middlewares/validate-token.js";

const aerobicsRouter = Router();

aerobicsRouter
.all("/*", validateToken)
.get("/", getUserAerobics)
.post("/:date", aerobicValidation.validateAerobic, postAerobics);

export default aerobicsRouter;