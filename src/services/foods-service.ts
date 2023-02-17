import { notFoundError } from "../errors/index.js";
import foodsRepository from "../repositories/foods-repository.js";

async function getFoodByName(name:string) {
    const food = await foodsRepository.getFoodByName(name);
    if(!food) {
        throw notFoundError
    }
    return food;    
};

const foodsService = {
    getFoodByName
};

export default foodsService;