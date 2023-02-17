import { notFoundError, duplicatedMealError } from "../errors/index.js";
import mealsRepository from "../repositories/meals-repository.js";

async function getMealsByDate(date: Date) {
    const meals = await mealsRepository.getMealsByDate(date);
    if(!meals) {
        throw notFoundError();
    }    
    return meals;
};

async function createMeal(userId: number, name: string, date: Date) {
    const mealByDay = await mealsRepository.getMealsByDate(date);
    const userMeals = mealByDay.filter(el => el.userId === userId);


    if(userMeals.length !== 0) {
        const specificMeal = userMeals.filter(el => el.name === name);
        if(specificMeal.length !== 0) {
            throw duplicatedMealError();
        }
    }

    const createdMeal = await mealsRepository.createMeal(userId, name, date);
    return createdMeal;
}

const mealsService = {
    getMealsByDate,
    createMeal,
};

export default mealsService;