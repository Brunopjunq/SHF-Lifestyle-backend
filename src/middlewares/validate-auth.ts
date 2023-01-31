import { NextFunction } from "express";
import httpStatus from "http-status";
import authSchema from "../schemas/auth-schemas";
import { Request, Response } from "express";

function validateSingUp(req: Request,res: Response, next) {
    const newUser = req.body;
    const validation = authSchema.userSchema.validate(newUser, {abortEarly: false});

    if(validation.error) {
        const errorMessage = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorMessage);
    }

    next();
};

function validateLogin(req: Request,res: Response, next ) {
    const login = req.body;
    const validation = authSchema.loginSchema.validate(login, {abortEarly: false});

    if(validation.error) {
        const errorMessage = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorMessage);
    };

    next();
};

const authValidation = {
    validateSingUp,
    validateLogin
};

export default authValidation;