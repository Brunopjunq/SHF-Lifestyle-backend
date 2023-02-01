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

async function createWorkout(name: string, userId: number) {
    const workout = await workoutsRepository.createWorkout(name, userId);

    return workout
};

const workoutsServices = {
    getWorkouts,
    getUserWorkouts,
    createWorkout,
};

export default workoutsServices;