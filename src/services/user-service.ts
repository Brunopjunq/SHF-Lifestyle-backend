import userRepository from "../repositories/user-repository.js";

async function updateCaloriesGoal(caloriesGoal: number, userId: number) {
    const updatedUser = await userRepository.updateCaloriesGoal(caloriesGoal,userId);
    return updatedUser;
};

const userService = {
    updateCaloriesGoal,
};

export default userService;