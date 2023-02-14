import prisma from "../database/database.js";

async function getAllWeights(userId: number) {
    return prisma.weightControl.findMany({
        where: {
            userId
        }, orderBy: {
            createdAt: 'desc'
        }
    })    
};

async function createWeight(userId: number, date: Date, weight: number) {
    return prisma.weightControl.create({
        data: {
            date,
            weight,
            userId,
        },
    })
};

const weightRepository = {
    getAllWeights,
    createWeight
};

export default weightRepository;