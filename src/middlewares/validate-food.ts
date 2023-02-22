import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { foodSchema } from "../schemas/food-schema.js";

function validateFood(req: Request, res: Response, next: NextFunction) {
    const newFood = req.body
    const validation = foodSchema.validate(newFood, {abortEarly: false});

    if(validation.error) {
        const errorMessage = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorMessage);
    }

    next();
}

const foodValidation = {
    validateFood
};

export default foodValidation;