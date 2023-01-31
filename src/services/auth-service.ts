import { users } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "../errors/duplicate-email-error.js";
import authRepository from "../repositories/auth-repository.js";
import jwt from "jsonwebtoken";
import { exclude } from "../utils/prisma-utils.js";
import { invalidCredentialsError } from "../errors/invalid-credentials-error.js";

async function createUser({ name, email, password }: CreateUserParams): Promise<users> {
    await validateUniqueEmail(email);

    const hashedPassword = await bcrypt.hash(password, 12);
    return authRepository.createUser({
        name,
        email,
        password: hashedPassword,
    });
};

async function signIn(params: SignInParams): Promise<SignInResult> {
    const { email, password } = params;
    
    const user = await getUser(email);

    await validatePassword(password, user.password);

    const token = await createSession(user.id);

    return {
        user: exclude(user, "password"),
        token,
    };
};

async function createSession(userId: number) {
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    await authRepository.createSession({
        token,
        userId,
    });

    return token;
};

async function getUser(email: string): Promise<GetUserResult> {
    const user = await authRepository.findByEmail(email);
    if(!user) {
        throw invalidCredentialsError();
    }

    return user;
}

async function validateUniqueEmail(email: string) {
    const userWithEmail = await authRepository.findByEmail(email);
    if(userWithEmail) {
        throw duplicatedEmailError();
    }
};

async function validatePassword(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if(!isPasswordValid) {
        throw invalidCredentialsError();
    }
}

export type CreateUserParams = Pick<users, "name" | "email" | "password">;

export type SignInParams = Pick<users, "email" | "password">;

export type SignInResult = {
    user: Pick<users, "id" | "name" | "email">;
    token: string;
};

export type GetUserResult = Pick<users, "id" | "name" | "email" | "password">;

const authService = {
    createUser,
    signIn,
};


export default authService;