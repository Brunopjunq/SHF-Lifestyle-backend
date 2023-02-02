import { NextFunction, Request, Response } from "express";
import { aerobicSchema } from "../schemas/aerobics-schema.js";
import httpStatus from "http-status";

function validateAerobic(req: Request, res: Response, next: NextFunction) {
    const newAerobic = req.body
    const validation = aerobicSchema.validate(newAerobic, {abortEarly: false});

    if(validation.error) {
        const errorMessage = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorMessage);
    }

    next();
}

const aerobicValidation = {
    validateAerobic
};

export default aerobicValidation;