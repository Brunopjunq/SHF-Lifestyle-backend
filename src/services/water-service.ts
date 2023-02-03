import { notFoundError } from "../errors/index.js";
import waterRepository from "../repositories/water-repository.js";

async function getWaterCount(userId: number) {
    const water = await waterRepository.getWaterCount(userId);
    if(!water) {
        throw notFoundError();
    }

    return water
};

const waterService = {
    getWaterCount,
};

export default waterService;