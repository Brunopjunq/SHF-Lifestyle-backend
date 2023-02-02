import { notFoundError } from "../errors/index.js";
import aerobicsRepository from "../repositories/aerobics-repository.js";

async function getUserAerobics(userId: number) {
    const aerobics = await aerobicsRepository.getUserAerobics(userId);
    if(!aerobics) {
        throw notFoundError();
    }

    return aerobics;
}

const aerobicsService = {
    getUserAerobics,
};

export default aerobicsService;