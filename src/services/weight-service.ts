import { notFoundError, unauthorizedError } from "../errors/index.js";
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

async function deleteWeight(weightId: number, userId: number) {
    const weight = await weightRepository.getWeightById(weightId)
    
    if(!weight) {
        throw notFoundError()
    }

    if(userId !== weight.userId) {
        throw unauthorizedError();
    }

    const deletedWeight = await weightRepository.deleteWeight(weightId);
    return deletedWeight;
}

const weightService = {
    getAllWeights,
    createWeight,
    deleteWeight
};

export default weightService;