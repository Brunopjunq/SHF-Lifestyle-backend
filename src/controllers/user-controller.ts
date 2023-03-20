import { AuthenticatedRequest } from "../middlewares/validate-token.js";
import { Response } from "express";
import userService from "../services/user-service.js";
import httpStatus from "http-status";
import { exclude } from "../utils/prisma-utils.js";

export async function updateUser(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { water_goal, calories_goal, weight_goal, name } = req.body;
    
        const updatedUser = await userService.updateUser(water_goal,calories_goal,weight_goal,name, userId);
        return res.status(httpStatus.OK).send(exclude(updatedUser, 'password'));
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST); 
    }
}