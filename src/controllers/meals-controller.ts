import { AuthenticatedRequest } from "../middlewares/validate-token.js";
import { Response } from "express";
import httpStatus from "http-status";
import mealsService from "../services/meals-service.js";

export async function getMealsByDate(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { date } = req.params;
        const newDate = new Date(date)

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

export async function postMeals(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { date } = req.params;
        const newDate = new Date(date);
    
        const meals = await mealsService.createMeals(userId,newDate);
        return res.status(httpStatus.CREATED).send(meals);
    } catch (error) {
        if (error.name === "DuplicatedMealError") {
            return res.sendStatus(httpStatus.CONFLICT);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST); 
    }
};

export async function postFoodByMeal(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { date } = req.params;
        const { mealId } = req.params;
        const { foodId } = req.params;
        const newFoodId = Number(foodId);
        const newMealId = Number(mealId);
        const { quantity } = req.body;
        const newDate = new Date(date)
    
        const foodByMeal = await mealsService.createFoodByMeal(userId, newFoodId, newMealId, newDate, quantity);
        return res.status(httpStatus.CREATED).send(foodByMeal)
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

};

export async function deleteFoodByMeal(req: AuthenticatedRequest, res: Response) {
    try {
        const { id } = req.params;
        const NewId = Number(id);
        const { userId } = req;

        const foodByMeal = await mealsService.deleteFoodByMeal(NewId, userId);
        return res.status(httpStatus.OK).send(foodByMeal);
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

export async function getCaloriesByDay(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const totalCalories = await mealsService.getCaloriesByDay(userId);
        return res.status(httpStatus.OK).send(totalCalories);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST); 
    }    
}