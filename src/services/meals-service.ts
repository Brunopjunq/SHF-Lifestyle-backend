import { notFoundError } from "../errors/index.js";
import mealsRepository from "../repositories/meals-repository.js";

async function getMealsByDate(date: Date) {
    const meals = await mealsRepository.getMealsByDate(date);
    if(!meals) {
        throw notFoundError();
    }    
    return meals;
};

const mealsService = {
    getMealsByDate,
};

export default mealsService;