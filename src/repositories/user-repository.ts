import prisma from "../database/database.js";

async function updateCaloriesGoal(caloriesGoal: number, userId: number) {
    return prisma.users.update({
        where: {
            id: userId,
        }, data: {
            calories_goal: caloriesGoal
        }
    })
};

const userRepository = {
    updateCaloriesGoal,
}

export default userRepository;