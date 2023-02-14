import { NextFunction, Request, Response } from "express";
import weightsSchema from "../schemas/weight-schema.js";
import httpStatus from "http-status";

function validateWeight(req: Request, res: Response, next: NextFunction) {
    const newWeight = req.body;
    const validation = weightsSchema.weightSchema.validate(newWeight, {abortEarly: false});

    if(validation.error) {
        const errorMessage = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorMessage);
    }

    next();
};

const weightValidation = {
    validateWeight,
};

export default weightValidation;