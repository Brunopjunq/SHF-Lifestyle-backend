import { foods } from "@prisma/client";
import { notFoundError } from "../errors/index.js";
import foodsRepository from "../repositories/foods-repository.js";

async function getFoodByName(name:string) {
    const food = await foodsRepository.getFoodByName(name);
    if(!food) {
        throw notFoundError
    }
    return food;    
};

async function createFood(data: createFoodParams) {
    const food = await foodsRepository.createFood(data);
    return food;
}

const foodsService = {
    getFoodByName,
    createFood,
};

export type createFoodParams = Pick<foods, "name" | "quantity" | "calories" | "protein" | "carbohydrate" | "lipid">;

export default foodsService;