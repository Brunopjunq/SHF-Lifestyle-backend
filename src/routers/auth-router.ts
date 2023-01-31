import { Router } from "express";
import { createUser } from "../controllers/auth-controller.js";
import authValidation from "../middlewares/validate-auth.js";

const userRouter = Router();

userRouter.post('/signUp', authValidation.validateSingUp , createUser);

export default userRouter;