import { notFoundError, unauthorizedError } from '../errors/index.js'
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

async function deleteWorkout(workoutId: number, userId: number) {
    const workout = await workoutsRepository.getWorkoutById(workoutId);

    if(!workout) {
        throw notFoundError();
    }

    if(userId !== workout.userId) {
        throw unauthorizedError();
    }

    const deleteworkout = await workoutsRepository.deleteWorkout(workoutId);
    
    return deleteworkout;
}

const workoutsServices = {
    getWorkouts,
    getUserWorkouts,
    createWorkout,
    deleteWorkout,
};

export default workoutsServices;