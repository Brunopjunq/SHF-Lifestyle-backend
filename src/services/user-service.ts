import userRepository from "../repositories/user-repository.js";

async function updateUser(caloriesGoal: number, weight_goal: number,name: string, userId: number) {
    const updatedUser = await userRepository.updateUser(caloriesGoal,weight_goal,name,userId);
    return updatedUser;
};

const userService = {
    updateUser,
};

export default userService;