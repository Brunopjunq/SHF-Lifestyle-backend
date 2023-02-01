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

async function createWorkout(name: string, userId: number) {
    return await prisma.workouts.create({
        data: {
            name,
            userId,
        },
    });    
};

const workoutsRepository = {
    getWorkouts,
    getUserWorkouts,
    createWorkout
};

export default workoutsRepository;