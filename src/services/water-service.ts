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

async function updateWaterCount(userId: number) {
    const checkWater = await waterRepository.getWaterCount(userId);
    const check1 = checkWater.find(el => el.date == '2023-02-02')
    if(check1.quantity === 0) {
        throw duplicatedWaterCountError();
    }
    
    const updatedWaterCount = await waterRepository.updateWaterCount(userId);
    return updatedWaterCount;    
}

async function increaseWaterCount(userId: number, date: string) {
    const water = await waterRepository.increaseWaterCount(userId,date);

    if(!water) {
        throw notFoundError();
    }

    return water;
    
}

const waterService = {
    getWaterCount,
    getWaterCountByDay,
    createWaterCount,
    updateWaterCount,
    increaseWaterCount
};

export default waterService;