import { Router } from "express";
import { createUser, signIn } from "../controllers/auth-controller.js";
import authValidation from "../middlewares/validate-auth.js";

const authRouter = Router();

authRouter
.post('/signUp', authValidation.validateSingUp , createUser)
.post('/', authValidation.validateLogin, signIn);

export default authRouter;