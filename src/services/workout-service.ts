import { notFoundError } from '../errors/index.js'
import workoutsRepository from "../repositories/workout-repository.js";

async function getWorkouts() {
    const workouts = await workoutsRepository.getWorkouts();
    if (!workouts) {
        throw notFoundError();
    }

    return workouts;
}

async function getUserWorkouts(userId: number) {
    const workouts = await workoutsRepository.getUserWorkouts(userId);
    if(!workouts) {
        throw notFoundError();
    }

    return workouts;
}

const workoutsServices = {
    getWorkouts,
    getUserWorkouts,
};

export default workoutsServices;