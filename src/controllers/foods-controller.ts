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