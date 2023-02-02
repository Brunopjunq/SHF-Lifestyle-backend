import prisma from "../database/database.js";

async function getUserAerobics(userId: number) {
    return await prisma.aerobicsExercises.findMany({
        where: {
            userId,
        },
    });
};

const aerobicsRepository = {
    getUserAerobics,
};

export default aerobicsRepository;