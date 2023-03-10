import { AuthenticatedRequest } from "../middlewares/validate-token.js";
import { Response } from "express";
import httpStatus from "http-status";
import foodsService from "../services/foods-service.js";

export async function getFoodByName(req: AuthenticatedRequest, res: Response) {
    try {
        const { name } = req.params;

        const foods = await foodsService.getFoodByName(name);
        return res.status(httpStatus.OK).send(foods);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function postFood(req: AuthenticatedRequest, res: Response) {
    try {
        const {name, quantity, calories, protein, carbohydrate, lipid} = req.body;
        const newCalories = calories / (quantity / 100);
        const newProtein = protein / (quantity / 100);
        const newCarbohydrate = carbohydrate / (quantity / 100);
        const newLipid = lipid / (quantity / 100);
        const food = await foodsService.createFood({name, quantity: 100, calories: newCalories, protein: newProtein, carbohydrate: newCarbohydrate, lipid: newLipid});
        return res.status(httpStatus.CREATED).send(food);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }    
}