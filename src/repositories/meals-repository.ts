import prisma from "../database/database.js";

async function getMealsByDate(date: Date) {
    return prisma.meals.findMany({
        where: {
            date,
        }, include: {
            foods_meals: {
                include: {
                    foods: true,
                }
            }
        },
    })
};

async function createMeal(userId: number, name: string, date: Date) {
    return prisma.meals.create({
        data: {
            userId,
            name,
            date,
        },
    })    
};

async function createFoodByMeal(userId: number, foodId: number, mealId: number, date: Date, quantity: number) {
    return prisma.foods_meals.create({
        data: {
            userId,
            foodId,
            mealId,
            date,
            quantity,
        },
    })    
};

async function getFoodByMealById(id: number) {
    return prisma.foods_meals.findFirst({
        where: {
            id,
        },
    })    
};

async function deleteFoodByMeal(id: number) {
    return prisma.foods_meals.delete({
        where: {
            id,
        },
    })    
};

const mealsRepository = {
    getMealsByDate,
    createMeal,
    createFoodByMeal,
    getFoodByMealById,
    deleteFoodByMeal,
};

export default mealsRepository;