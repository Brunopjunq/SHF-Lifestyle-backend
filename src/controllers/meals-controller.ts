import { AuthenticatedRequest } from "../middlewares/validate-token.js";
import { Response } from "express";
import httpStatus from "http-status";
import mealsService from "../services/meals-service.js";

export async function getMealsByDate(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { date } = req.params;
        const newDate = new Date(date)
        console.log(newDate);

        const meals = await mealsService.getMealsByDate(newDate);
        const userMeals = meals.filter(el => el.userId === userId);
        return res.status(httpStatus.OK).send(userMeals);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }    
}