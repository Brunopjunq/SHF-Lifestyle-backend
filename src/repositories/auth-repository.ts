import prisma from "../database/database.js";
import { Prisma } from "@prisma/client";

async function createUser(data: Prisma.usersUncheckedCreateInput) {
    return prisma.users.create({
        data,
    });
};

async function findByEmail(email: string, select?: Prisma.usersSelect) {
    const params: Prisma.usersFindUniqueArgs = {
        where: {
            email,
        },
    };
    
    if(select) {
        params.select = select
    }

    return prisma.users.findUnique(params)
};

const userRepository = {
    createUser,
    findByEmail,
};

export default userRepository;