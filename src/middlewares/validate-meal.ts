import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import mealsSchema from "../schemas/meal-schema.js";

function validateMeal(req: Request, res: Response, next: NextFunction) {
    const newMeal = req.body;
    const validation = mealsSchema.mealSchema.validate(newMeal, {abortEarly: false});

    if(validation.error) {
        const errorMessage = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorMessage);
    }

    next();
}

const mealsValidation = {
    validateMeal
};

export default mealsValidation;