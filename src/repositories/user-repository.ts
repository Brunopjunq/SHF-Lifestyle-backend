import prisma from "../database/database.js";

async function updateUser(caloriesGoal: number, weight_goal: number, name: string, userId: number) {
    return prisma.users.update({
        where: {
            id: userId,
        }, data: {
            calories_goal: caloriesGoal,
            name: name,
            weight_goal: weight_goal,
        }
    })
};

const userRepository = {
    updateUser,
}

export default userRepository;