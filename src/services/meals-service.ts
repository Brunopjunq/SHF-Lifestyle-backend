import { notFoundError, duplicatedMealError, unauthorizedError } from "../errors/index.js";
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

async function createFoodByMeal(userId: number, foodId: number, mealId: number, date: Date, quantity: number) {
    const createdFood = await mealsRepository.createFoodByMeal(userId, foodId, mealId, date, quantity);
    return createdFood;    
}

async function deleteFoodByMeal(id: number, userId: number) {
    const foodByMeal = await mealsRepository.getFoodByMealById(id)

    if(!foodByMeal) {
        throw notFoundError();
    }
    if(userId !== foodByMeal.userId) {
        throw unauthorizedError();
    }

    const deletedFoodByMeal = await mealsRepository.deleteFoodByMeal(id);
    return deletedFoodByMeal;
}

const mealsService = {
    getMealsByDate,
    createMeal,
    createFoodByMeal,
    deleteFoodByMeal
};

export default mealsService;