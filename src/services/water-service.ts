import { notFoundError } from "../errors/index.js";
import waterRepository from "../repositories/water-repository.js";

async function getWaterCount(userId: number) {
    const water = await waterRepository.getWaterCount(userId);
    if(!water) {
        throw notFoundError();
    }

    return water
};

async function getWaterCountByDay(date: string) {
    const water = await waterRepository.getWaterCountByDay(date);
    if(!water) {
        throw notFoundError();
    }

    return water;
}

const waterService = {
    getWaterCount,
    getWaterCountByDay,
};

export default waterService;