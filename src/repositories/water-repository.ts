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

const waterRepository = {
    getWaterCount,
    getWaterCountByDay
};

export default waterRepository;