import prisma from "../database/database.js";

async function getMealsByDate(date: Date) {
    return prisma.meals.findMany({
        where: {
            date,
        }, include: {
            foods_meals: true
        }
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

async function createFoodByMeal(userId: number, foodId: number, mealId: number, date: Date) {
    return prisma.foods_meals.create({
        data: {
            userId,
            foodId,
            mealId,
            date,
        },
    })    
};

const mealsRepository = {
    getMealsByDate,
    createMeal,
    createFoodByMeal
};

export default mealsRepository;