import { aerobicsExercises } from "@prisma/client";
import { notFoundError } from "../errors/index.js";
import aerobicsRepository from "../repositories/aerobics-repository.js";

async function getUserAerobics(userId: number) {
    const aerobics = await aerobicsRepository.getUserAerobics(userId);
    if(!aerobics) {
        throw notFoundError();
    }

    return aerobics;
}

async function createAerobics(data: createAerobicsParams) {
    const aerobics = await aerobicsRepository.createAerobics(data);
    
    return aerobics;
}

const aerobicsService = {
    getUserAerobics,
    createAerobics,
};

export type createAerobicsParams = Pick<aerobicsExercises, "name" | "userId" | "calories" | "time" | "date">;

export default aerobicsService;