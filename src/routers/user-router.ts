import { Router } from "express";
import { updateUser } from "../controllers/user-controller.js";
import { validateToken } from "../middlewares/validate-token.js";

const userRouter = Router();

userRouter.all("/*", validateToken)
.put('/', updateUser);

export default userRouter;