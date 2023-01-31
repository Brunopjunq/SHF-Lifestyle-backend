import prisma from "../database/database.js";
import { Prisma } from "@prisma/client";

async function createUser(data: Prisma.usersUncheckedCreateInput) {
    return prisma.users.create({
        data,
    });
};

const userRepository = {
    createUser
};

export default userRepository;