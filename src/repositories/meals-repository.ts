import prisma from "../database/database.js";

async function getMealsByDate(date: Date) {
    return prisma.meals.findMany({
        where: {
            date,
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

const mealsRepository = {
    getMealsByDate,
    createMeal
};

export default mealsRepository;