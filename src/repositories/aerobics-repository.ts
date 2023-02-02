import { Prisma } from "@prisma/client";
import prisma from "../database/database.js";

async function getUserAerobics(userId: number) {
    return await prisma.aerobicsExercises.findMany({
        where: {
            userId,
        },
    });
};

async function createAerobics(data: Prisma.aerobicsExercisesUncheckedCreateInput) {
    return prisma.aerobicsExercises.create({
        data,
    });
};

const aerobicsRepository = {
    getUserAerobics,
    createAerobics,
};

export default aerobicsRepository;