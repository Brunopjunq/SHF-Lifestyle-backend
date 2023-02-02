import { AuthenticatedRequest } from "../middlewares/validate-token.js";
import { Response } from "express";
import httpStatus from "http-status";
import aerobicsService from "../services/aerobics-service.js";

export async function getUserAerobics(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;

        const aerobics = await aerobicsService.getUserAerobics(userId);
        return res.status(httpStatus.OK).send(aerobics);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }    
}