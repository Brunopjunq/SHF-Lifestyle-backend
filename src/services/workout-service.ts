import { Prisma, workoutExercises } from '@prisma/client';
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

async function updateWorkout(workoutId: number, name: string, userId: number) {
    const workout = await workoutsRepository.getWorkoutById(workoutId);

    if(!workout) {
        throw notFoundError();
    }

    if(userId !== workout.userId) {
        throw unauthorizedError();
    }
    
    const updatedWorkout = await workoutsRepository.updateWorkout(workoutId, name);
    return updatedWorkout;
}

async function getUserWorkoutsExercisesById(workoutId: number, userId: number) {
    const workoutExercises = await workoutsRepository.getUserWorkoutsExercisesById(workoutId, userId);
    if(!workoutExercises) {
        throw notFoundError();
    }

    const workout = await workoutsRepository.getWorkoutById(workoutId);

    if(!workout) {
        throw notFoundError();
    }

    if(userId !== workout.userId) {
        throw unauthorizedError();
    }
    
    return workoutExercises;
};

async function createWorkoutExercise(data: createWorkoutExerciseParams) {
    const workoutExercise = await workoutsRepository.createWorkoutExercise(data);

    return workoutExercise;
}

export type createWorkoutExerciseParams = Pick<workoutExercises, "name" | "reps" | "series" | "userId" | "weight_current" | "weight_previous" | "workoutId" >;

const workoutsServices = {
    getWorkouts,
    getUserWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout,
    getUserWorkoutsExercisesById,
    createWorkoutExercise,
};

export default workoutsServices;