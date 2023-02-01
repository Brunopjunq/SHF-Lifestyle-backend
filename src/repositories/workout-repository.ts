import { QueryResult } from "pg";
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

const workoutsRepository = {
    getWorkouts,
    getUserWorkouts,
};

export default workoutsRepository;