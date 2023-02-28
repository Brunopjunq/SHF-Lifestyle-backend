import prisma from "../database/database.js";

async function updateUser(caloriesGoal: number,name: string, userId: number) {
    return prisma.users.update({
        where: {
            id: userId,
        }, data: {
            calories_goal: caloriesGoal,
            name: name,
        }
    })
};

const userRepository = {
    updateUser,
}

export default userRepository;