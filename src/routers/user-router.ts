import { Router } from "express";
import { updateCaloriesGoal } from "../controllers/user-controller.js";
import { validateToken } from "../middlewares/validate-token.js";

const userRouter = Router();

userRouter.all("/*", validateToken)
.put('/calories', updateCaloriesGoal);

export default userRouter;