import { AuthenticatedRequest } from "../middlewares/validate-token.js";
import { Response } from "express";
import httpStatus from "http-status";
import waterService from "../services/water-service.js";

export async function getWaterCount(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;

        const water = await waterService.getWaterCount(userId);
        return res.status(httpStatus.OK).send(water);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
};