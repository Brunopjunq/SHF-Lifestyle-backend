import { notFoundError, duplicatedMealError, unauthorizedError } from "../errors/index.js";
import mealsRepository from "../repositories/meals-repository.js";

async function getMealsByDate(date: Date) {
    const meals = await mealsRepository.getMealsByDate(date);
    if(!meals) {
        throw notFoundError();
    }    
    return meals;
};

async function createMeals(userId: number, date: Date) {
    const mealByDay = await mealsRepository.getMealsByDate(date);
    const userMeals = mealByDay.filter(el => el.userId === userId);

    if(userMeals.length !== 0) {
        throw duplicatedMealError(); 
    }

    const createdMeal = await mealsRepository.createMeals(userId, date);
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

async function getCaloriesByDay(userId: number) {
    const totalCalories = await mealsRepository.getCaloriesByDay(userId);
    return totalCalories;    
}

const mealsService = {
    getMealsByDate,
    createMeals,
    createFoodByMeal,
    deleteFoodByMeal,
    getCaloriesByDay
};

export default mealsService;