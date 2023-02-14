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

async function getWeightById(id: number) {
    return prisma.weightControl.findFirst({
        where: {
            id,
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

async function deleteWeight(weightId: number) {
    return prisma.weightControl.delete({
        where: {
            id: weightId,
        }
    })
};


const weightRepository = {
    getAllWeights,
    getWeightById,
    createWeight,
    deleteWeight,
};

export default weightRepository;