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
};

export async function getUserAerobicsByDay(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { date } = req.params;
        
        const aerobics = await aerobicsService.getUserAerobicsByDay(userId, date)
        
        const userAerobics = aerobics.filter(el => el.userId === userId)
        return res.status(httpStatus.OK).send(userAerobics);
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
        const {name,calories,time} = req.body;

        const aerobic = await aerobicsService.createAerobics({name,userId,calories,date, time});
        return res.status(httpStatus.CREATED).send(aerobic);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }    
}

export async function updateAerobics(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { exerciseId, date } = req.params;
        const numExerciseId = Number(exerciseId);
        const {name,calories,time} = req.body;

        const aerobic = await aerobicsService.updateAerobics({name,calories,time, date}, numExerciseId, userId)
        return res.status(httpStatus.OK).send(aerobic);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        return res.status(httpStatus.BAD_REQUEST).send(error);
    }    
}

export async function deleteAerobics(req: AuthenticatedRequest, res: Response) {
    try {
        const { exerciseId } = req.params;
        const numExerciseId = Number(exerciseId);
        const { userId } = req;

        const aerobic = await aerobicsService.deleteAerobics(numExerciseId, userId);
        return res.status(httpStatus.OK).send(aerobic);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        return res.sendStatus(httpStatus.BAD_REQUEST); 
    }    
};