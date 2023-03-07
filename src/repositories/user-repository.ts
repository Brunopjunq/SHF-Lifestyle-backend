import prisma from "../database/database.js";

async function updateUser(water_goal: number, caloriesGoal: number, weight_goal: number, name: string, userId: number) {
    return prisma.users.update({
        where: {
            id: userId,
        }, data: {
            calories_goal: caloriesGoal,
            name: name,
            weight_goal: weight_goal,
            water_goal: water_goal,
        }
    })
};

const userRepository = {
    updateUser,
}

export default userRepository;