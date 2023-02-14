import weightService from "../services/weight-service.js";
import { AuthenticatedRequest } from "../middlewares/validate-token.js";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllWeights(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;

        const weight = await weightService.getAllWeights(userId);
        return res.status(httpStatus.OK).send(weight);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }    
};

export async function postWeight(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { date } = req.params;
        const { weight } = req.body;

        const newDate = new Date(date);

        const createdWeight = await weightService.createWeight(userId,newDate,weight);
        return res.status(httpStatus.CREATED).send(createdWeight);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }    
};

export async function deleteWeight(req: AuthenticatedRequest, res: Response) {
    try {
        const { weightId } = req.params;
        const numWeightId = Number(weightId)
        const { userId } = req;

        const deletedWeight = await weightService.deleteWeight(numWeightId, userId);
        return res.status(httpStatus.OK).send(deletedWeight);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        return res.sendStatus(httpStatus.BAD_REQUEST); 
    }
}