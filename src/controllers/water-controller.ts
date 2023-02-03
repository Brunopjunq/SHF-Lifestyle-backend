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

export async function getWaterCountByDay(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { date } = req.params;

        const waterCount = await waterService.getWaterCountByDay(date);
        const userWater = waterCount.filter(el => el.userId === userId);
        return res.status(httpStatus.OK).send(userWater);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }    
}

export async function postWaterCount(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } =req;
        const { date } = req.params;
        const { quantity } = req.body;

        const waterCount = await waterService.createWaterCount(userId,date,quantity);
        return res.status(httpStatus.CREATED).send(waterCount);
    } catch (error) {
        if (error.name === "DuplicatedWaterCountError") {
            return res.sendStatus(httpStatus.CONFLICT);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }    
};

export async function updatedWaterCount(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;

        const waterCount = await waterService.updateWaterCount(userId);
        return res.status(httpStatus.OK).send(waterCount);
    } catch (error) {
        if (error.name === "DuplicatedWaterCountError") {
            return res.sendStatus(httpStatus.CONFLICT);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }    
}

export async function increaseWaterCount(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { date } = req.params;

        const waterCount = await waterService.increaseWaterCount(userId,date);
        return res.status(httpStatus.OK).send(waterCount);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }    
};