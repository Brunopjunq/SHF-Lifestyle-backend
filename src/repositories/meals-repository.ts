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

async function createMeals(userId: number, date: Date) {
    return prisma.meals.createMany({
        data: [
            {name: 'Café da Manhã', userId: userId, date: date},
            {name: 'Almoço', userId: userId, date: date},
            {name: 'Lanche', userId: userId, date: date},
            {name: 'Jantar', userId: userId, date: date},
        ]
    })
}

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

async function getCaloriesByDay(userId: number) {
    return prisma.$queryRaw`SELECT ((u.quantity * foods.calories)/100) as "Total", u.date  
    FROM foods_meals u 
    JOIN meals ON u."mealId"=meals.id 
    JOIN foods ON u."foodId"=foods.id 
    WHERE u."userId"=${userId}`
};

const mealsRepository = {
    getMealsByDate,
    createMeals,
    createFoodByMeal,
    getFoodByMealById,
    deleteFoodByMeal,
    getCaloriesByDay
};

export default mealsRepository;