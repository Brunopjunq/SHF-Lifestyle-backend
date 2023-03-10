import { Prisma } from "@prisma/client";
import prisma from "../database/database.js";
import { updateAerobicsParams } from "../services/aerobics-service.js";

async function getUserAerobics(userId: number) {
    return await prisma.aerobicsExercises.findMany({
        where: {
            userId,
        }, orderBy: {
            date: 'desc'
        }
    });
};

async function getUserAerobicsByDay(date: string) {
    return await prisma.aerobicsExercises.findMany({
        where: {
            date,      
        }, orderBy: {
            createdAt: 'desc'
        }
    })    
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

async function deleteAerobics(exerciseId: number) {
    return prisma.aerobicsExercises.delete({
        where: {
            id: exerciseId,
        }
    })
};

const aerobicsRepository = {
    getUserAerobics,
    getUserAerobicsByDay,
    getAerobicsById,
    createAerobics,
    updateAerobics,
    deleteAerobics,
};

export default aerobicsRepository;