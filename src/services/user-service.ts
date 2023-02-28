import userRepository from "../repositories/user-repository.js";

async function updateUser(caloriesGoal: number,name: string, userId: number) {
    const updatedUser = await userRepository.updateUser(caloriesGoal,name,userId);
    return updatedUser;
};

const userService = {
    updateUser,
};

export default userService;