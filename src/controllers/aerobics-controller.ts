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

export async function postAerobics(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { date } = req.params;
        const newDate = new Date(date);
        const {name,calories,time} = req.body;

        const aerobic = await aerobicsService.createAerobics({name,userId,calories,date: newDate, time});
        return res.status(httpStatus.CREATED).send(aerobic);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }    
}