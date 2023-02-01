import prisma from "../database/database.js";

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

const workoutsRepository = {
    getWorkouts,
    getUserWorkouts,
    getWorkoutById,
    createWorkout,
    deleteWorkout,
};

export default workoutsRepository;