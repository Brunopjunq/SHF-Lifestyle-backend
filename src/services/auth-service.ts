import { users } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "../errors/duplicate-email-error.js";
import userRepository from "../repositories/auth-repository.js";

async function createUser({ name, email, password }: CreateUserParams): Promise<users> {
    await validateUniqueEmail(email);

    const hashedPassword = await bcrypt.hash(password, 12);
    return userRepository.createUser({
        name,
        email,
        password: hashedPassword,
    });
};

async function validateUniqueEmail(email: string) {
    const userWithEmail = await userRepository.findByEmail(email);
    if(userWithEmail) {
        throw duplicatedEmailError();
    }
};

export type CreateUserParams = Pick<users, "name" | "email" | "password">;

const userService = {
    createUser,
};

export default userService;