import httpStatus from "http-status";
import { Response, Request } from "express";
import workoutsServices from "../services/workout-service.js";
import { AuthenticatedRequest } from "../middlewares/validate-token.js";

export async function getWorkouts(req: Request, res: Response) {
    try {
        const workouts = await workoutsServices.getWorkouts();
        res.status(httpStatus.OK).send(workouts);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
          return res.sendStatus(httpStatus.BAD_REQUEST);
    }
};

export async function getUserWorkouts(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;

        const workouts = await workoutsServices.getUserWorkouts(userId);
        res.status(httpStatus.OK).send(workouts);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    };    
};
