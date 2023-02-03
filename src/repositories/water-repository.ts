import prisma from "../database/database.js";

async function getWaterCount(userId: number) {
    return prisma.waterCount.findMany({
        where: {
            userId
        },
    })    
};

const waterRepository = {
    getWaterCount,
};

export default waterRepository;