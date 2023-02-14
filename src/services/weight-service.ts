import { notFoundError } from "../errors/index.js";
import weightRepository from "../repositories/weight-repository.js";

async function getAllWeights(userId: number) {
    const weight = await weightRepository.getAllWeights(userId);
    if(!weight) {
        throw notFoundError()
    }
    return weight    
};

async function createWeight(userId: number, date: Date, weight: number) {
    const createdWeight = await weightRepository.createWeight(userId, date, weight);
    return createdWeight;    
}

const weightService = {
    getAllWeights,
    createWeight,
};

export default weightService;