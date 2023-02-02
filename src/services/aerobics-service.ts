import { aerobicsExercises } from "@prisma/client";
import { notFoundError, unauthorizedError } from "../errors/index.js";
import aerobicsRepository from "../repositories/aerobics-repository.js";

async function getUserAerobics(userId: number) {
    const aerobics = await aerobicsRepository.getUserAerobics(userId);
    if(!aerobics) {
        throw notFoundError();
    }

    return aerobics;
}

async function getUserAerobicsByDay(userId: number, date: string) {
    const aerobics = await aerobicsRepository.getUserAerobicsByDay(userId, date);
    if(!aerobics) {
        throw notFoundError();
    }    

    return aerobics;
}

async function createAerobics(data: createAerobicsParams) {
    const aerobics = await aerobicsRepository.createAerobics(data);
    
    return aerobics;
}

async function updateAerobics(data: updateAerobicsParams, exerciseId:number, userId: number) {
    const aerobic = await aerobicsRepository.getAerobicsById(exerciseId);
    
    if(!aerobic) {
        throw notFoundError();
    }
    if(userId !== aerobic.userId) {
        throw unauthorizedError();
    }

    const updatedAerobic = await aerobicsRepository.updateAerobics(data, exerciseId);
    return updatedAerobic;
}

async function deleteAerobics(exerciseId: number, userId: number) {
    const aerobic = await aerobicsRepository.getAerobicsById(exerciseId);
    
    if(!aerobic) {
        throw notFoundError();
    }
    if(userId !== aerobic.userId) {
        throw unauthorizedError();
    }

    const deletedAerobic = await aerobicsRepository.deleteAerobics(exerciseId);
    return deletedAerobic;
}

const aerobicsService = {
    getUserAerobics,
    getUserAerobicsByDay,
    createAerobics,
    updateAerobics,
    deleteAerobics,
};

export type createAerobicsParams = Pick<aerobicsExercises, "name" | "userId" | "calories" | "time" | "date">;

export type updateAerobicsParams = Pick<aerobicsExercises, "name" | "calories" | "time" | "date">;

export default aerobicsService;