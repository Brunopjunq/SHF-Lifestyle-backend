import { Router } from "express";
import { deleteAerobics, getUserAerobics, getUserAerobicsByDay, postAerobics, updateAerobics } from "../controllers/aerobics-controller.js";
import aerobicValidation from "../middlewares/validate-aerobics.js";
import { validateToken } from "../middlewares/validate-token.js";

const aerobicsRouter = Router();

aerobicsRouter
.all("/*", validateToken)
.get("/", getUserAerobics)
.get("/:date", getUserAerobicsByDay)
.post("/:date", aerobicValidation.validateAerobic, postAerobics)
.put("/:date/:exerciseId", updateAerobics)
.delete("/:exerciseId", deleteAerobics);

export default aerobicsRouter;