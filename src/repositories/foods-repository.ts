import { Prisma } from "@prisma/client";
import prisma from "../database/database.js";

async function getFoodByName(name: string) {
    return prisma.foods.findMany({
        where: {
            name: {
                contains: name,
                mode: "insensitive"
            }
        }
    })    
};

async function createFood(data: Prisma.foodsUncheckedCreateInput) {
    return prisma.foods.create({
        data,
    })    
};

const foodsRepository = {
    getFoodByName,
    createFood
};

export default foodsRepository;