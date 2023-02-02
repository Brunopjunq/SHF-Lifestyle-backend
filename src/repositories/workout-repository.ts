import prisma from "../database/database.js";
import { Prisma } from "@prisma/client";

async function getWorkouts(){
    return await prisma.workouts.findMany();
}

async function getUserWorkouts(userId: number) {
    return await prisma.workouts.findMany({
        where: {
            userId,
        },
        include: {
            workoutExercises: {
                where: {
                    userId,
                },
            },
        },
    });
};

async function getWorkoutById(id: number){
    return await prisma.workouts.findFirst({
        where: {
            id,
        },
    });
};

async function getWorkoutExerciseById(id: number) {
    return await prisma.workoutExercises.findFirst({
        where: {
            id,
        },
    })    
};

async function createWorkout(name: string, userId: number) {
    return await prisma.workouts.create({
        data: {
            name,
            userId,
        },
    });    
};

async function deleteWorkout(workoutId: number) {
    const workoutExercises = prisma.workoutExercises.deleteMany({
        where: {
            workoutId,
        },
    });

    const workout = prisma.workouts.delete({
        where: {
            id: workoutId,
        },
    });

    return prisma.$transaction([workoutExercises,workout]);
};

async function updateWorkout(workoutId: number, name: string) {
    return await prisma.workouts.update({
        where: {
            id: workoutId,
        }, data: {
            name: name
        },
    });
};

async function getUserWorkoutsExercisesById(workoutId: number, userId: number) {
    return prisma.workoutExercises.findMany({
        where: {
            userId,
            workoutId
        },
    });
};

async function createWorkoutExercise(data: Prisma.workoutExercisesUncheckedCreateInput) {
    return prisma.workoutExercises.create({
        data,
    });    
};

async function updateWorkoutExercise(data: Prisma.workoutExercisesUncheckedCreateInput, exerciseId: number) {
    const exercise = await prisma.workoutExercises.findFirst({
        where: {
            id: exerciseId,
        },
    });
    
    const updateWeight = prisma.workoutExercises.update({
        where: {
            id: exerciseId,
        }, data: {
            weight_previous: exercise.weight_current
        },
    });
    
    const updateExercise = prisma.workoutExercises.update({
        where: {
            id: exerciseId,
        }, data
    });

    return prisma.$transaction([updateWeight, updateExercise]);
}

async function deleteWorkoutExercise(exerciseId: number) {
    return prisma.workoutExercises.delete({
        where: {
            id: exerciseId
        },
    });    
};

const workoutsRepository = {
    getWorkouts,
    getUserWorkouts,
    getWorkoutById,
    getWorkoutExerciseById,
    createWorkout,
    deleteWorkout,
    updateWorkout,
    getUserWorkoutsExercisesById,
    createWorkoutExercise,
    updateWorkoutExercise,
    deleteWorkoutExercise
};

export default workoutsRepository;