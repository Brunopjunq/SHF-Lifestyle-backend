import prisma from "../database/database.js";

async function getWaterCount(userId: number) {
    return prisma.waterCount.findMany({
        where: {
            userId
        }, orderBy: {
            date: "desc"
        }
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

async function updateWaterCount(userId: number) {
    return prisma.waterCount.update({
        where: {
            id: userId
        }, data: {
            quantity: {
                decrement: 1
            }
        }
    })
};

async function increaseWaterCount(userId: number, date: string) {
    const usersWater = await getWaterCount(userId);
    const userDayWater = usersWater.find(el => el.date == date);

    return prisma.waterCount.update({
        where: {
            id: userDayWater.id
        }, data: {
            quantity: {
                increment: 1
            }
        }
    })
    
};

async function decreaseWaterCount(userId: number, date: string) {
    const usersWater = await getWaterCount(userId);
    const userDayWater = usersWater.find(el => el.date == date);

    return prisma.waterCount.update({
        where: {
            id: userDayWater.id
        }, data: {
            quantity: {
                decrement: 1
            }
        }
    })
    
};

const waterRepository = {
    getWaterCount,
    getWaterCountByDay,
    createWaterCount,
    updateWaterCount,
    increaseWaterCount,
    decreaseWaterCount
};

export default waterRepository;