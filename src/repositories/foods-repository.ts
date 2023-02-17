import prisma from "../database/database.js";

async function getFoodByName(name: string) {
    return prisma.foods.findMany({
        where: {
            name: {
                contains: name
            }
        }
    })    
};

const foodsRepository = {
    getFoodByName
};

export default foodsRepository;