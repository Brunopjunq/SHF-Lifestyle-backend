import { duplicatedWaterCountError, notFoundError } from "../errors/index.js";
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

async function createWaterCount(userId: number, date: string, quantity: number) {
    const waterbyDay = await waterRepository.getWaterCountByDay(date);
    const userWater = waterbyDay.filter(el => el.userId === userId);
    
    if(userWater.length !== 0) {
        throw duplicatedWaterCountError();
    }

    const createdwater = await waterRepository.createWaterCount(userId,date,quantity);
    return createdwater;
}

const waterService = {
    getWaterCount,
    getWaterCountByDay,
    createWaterCount,
};

export default waterService;