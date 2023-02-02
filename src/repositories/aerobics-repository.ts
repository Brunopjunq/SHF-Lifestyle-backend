import { Prisma } from "@prisma/client";
import prisma from "../database/database.js";
import { updateAerobicsParams } from "../services/aerobics-service.js";

async function getUserAerobics(userId: number) {
    return await prisma.aerobicsExercises.findMany({
        where: {
            userId,
        },
    });
};

async function getAerobicsById(id: number) {
    return await prisma.aerobicsExercises.findFirst({
        where: {
            id,
        },
    })
};

async function createAerobics(data: Prisma.aerobicsExercisesUncheckedCreateInput) {
    return prisma.aerobicsExercises.create({
        data,
    });
};

async function updateAerobics(data: updateAerobicsParams, exerciseId: number) {
    return prisma.aerobicsExercises.update({
        where: {
            id: exerciseId,
        }, data
    });    
};

const aerobicsRepository = {
    getUserAerobics,
    getAerobicsById,
    createAerobics,
    updateAerobics,
};

export default aerobicsRepository;