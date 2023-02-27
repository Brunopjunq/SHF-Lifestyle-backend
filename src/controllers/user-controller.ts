import { AuthenticatedRequest } from "../middlewares/validate-token.js";
import { Response } from "express";
import userService from "../services/user-service.js";
import httpStatus from "http-status";

export async function updateCaloriesGoal(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { calories_goal } = req.body;
    
        const updatedUser = await userService.updateCaloriesGoal(calories_goal, userId);
        return res.status(httpStatus.OK).send(updatedUser);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST); 
    }
}