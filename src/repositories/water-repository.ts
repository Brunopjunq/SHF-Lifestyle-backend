import prisma from "../database/database.js";

async function getWaterCount(userId: number) {
    return prisma.waterCount.findMany({
        where: {
            userId
        },
    })    
};

async function getWaterCountByDay(date: string) {
    return prisma.waterCount.findMany({
        where: {
            date,
        },
    })    
};

async function createWaterCount(userId: number, date: string, quantity: number) {
    return prisma.waterCount.create({
        data: {
            date,
            quantity,
            userId,
        },
    })    
};

const waterRepository = {
    getWaterCount,
    getWaterCountByDay,
    createWaterCount
};

export default waterRepository;