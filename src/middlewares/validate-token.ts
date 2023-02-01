import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import prisma from "../database/database.js";
import * as jwt from "jsonwebtoken";
import { unauthorizedError } from "../errors/unauthorized-error.js";

export async function validateToken( req: AuthenticatedRequest, res: Response, next: NextFunction ) {
    const header = req.header("Authorization");
    if(!header) {
        return unauthorizedResponse(res);
    }

    const token = header.split(" ")[1];
    if (!token) {
        return unauthorizedResponse(res);
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

        const session = await prisma.sessions.findFirst({
            where: {
                token,
            },
        });

        if(!session) {
            return unauthorizedResponse(res);
        }

        req.userId = userId;
        return next();
        
    } catch (error) {
        return unauthorizedResponse(res);
    }
}

function unauthorizedResponse(res: Response) {
    res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
  }

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
    userId: number;
  };  