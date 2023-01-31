import { QueryResult } from "pg";
import prisma from "../database/database.js";

async function getWorkouts(){
    return await prisma.workouts.findMany();
}

const workoutsRepository = {
    getWorkouts,
};

export default workoutsRepository;