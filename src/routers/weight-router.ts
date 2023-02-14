import { Router } from "express";
import { deleteWeight, getAllWeights, postWeight } from "../controllers/weight-controller.js";
import { validateToken } from "../middlewares/validate-token.js";
import weightValidation from "../middlewares/validate-weight.js";

const weightRouter = Router();

weightRouter
.all("/*", validateToken)
.get("/", getAllWeights)
.post("/:date", weightValidation.validateWeight, postWeight)
.delete("/:weightId", deleteWeight);

export default weightRouter;