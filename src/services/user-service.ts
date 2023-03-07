import userRepository from "../repositories/user-repository.js";

async function updateUser(water_goal: number, caloriesGoal: number, weight_goal: number,name: string, userId: number) {
    const updatedUser = await userRepository.updateUser(water_goal, caloriesGoal,weight_goal,name,userId);
    return updatedUser;
};

const userService = {
    updateUser,
};

export default userService;