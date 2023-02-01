import { NextFunction, Request, Response } from "express";
import workoutsSchema from "../schemas/workout-schemas.js";
import httpStatus from "http-status";

function validateWorkout(req: Request, res: Response, next: NextFunction) {
    const newWorkout = req.body;
    const validation = workoutsSchema.workoutSchema.validate(newWorkout, {abortEarly: false});

    if(validation.error) {
        const errorMessage = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorMessage);
    }

    next();
}


const workoutsValidation = {
    validateWorkout
};

export default workoutsValidation;