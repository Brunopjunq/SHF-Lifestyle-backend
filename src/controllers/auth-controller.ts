import { Request, Response } from "express";
import httpStatus from "http-status";
import authService, { SignInParams } from "../services/auth-service.js";

export async function createUser(req: Request, res: Response ) {
    const { name, email, password } = req.body;
    
    try {
        const user = await authService.createUser({name, email, password });
        return res.status(httpStatus.CREATED).json({
            id: user.id,
            email: user.email,
        });
    } catch (error) {
        if (error.name === "DuplicatedEmailError") {
            return res.status(httpStatus.CONFLICT).send(error);
          }
          return res.status(httpStatus.BAD_REQUEST).send(error);
    }
};

export async function signIn(req: Request, res: Response ) {
    const { email, password } = req.body as SignInParams;

    try {
        const result = await authService.signIn({email, password});

        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).send({});
    }
    
}