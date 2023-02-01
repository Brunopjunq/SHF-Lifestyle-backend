import httpStatus from "http-status";
import { Response, Request } from "express";
import workoutsServices from "../services/workout-service.js";
import { AuthenticatedRequest } from "../middlewares/validate-token.js";

export async function getWorkouts(req: Request, res: Response) {
    try {
        const workouts = await workoutsServices.getWorkouts();
        return res.status(httpStatus.OK).send(workouts);
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
        return res.status(httpStatus.OK).send(workouts);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    };    
};

export async function postWorkout(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { name } = req.body;

        const workout = await workoutsServices.createWorkout(name, userId);
        return res.status(httpStatus.CREATED).send(workout);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
};

export async function deleteWorkout(req: AuthenticatedRequest, res: Response) {
    try {
        const { workoutId } = req.body;
        const { userId } = req;

        const workout = await workoutsServices.deleteWorkout(workoutId,userId);
        return res.status(httpStatus.OK).send(workout)
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

export async function updateWorkout(req: AuthenticatedRequest, res: Response) {
    try {
        const { workoutId, name } = req.body;
        const { userId } = req;

        const workout = await workoutsServices.updateWorkout(workoutId,name,userId);
        return res.status(httpStatus.OK).send(workout);
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
