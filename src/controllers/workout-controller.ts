import httpStatus from "http-status";
import { Response, Request } from "express";
import workoutsServices from "../services/workout-service.js";
import { AuthenticatedRequest } from "../middlewares/validate-token.js";

export async function getWorkouts(req: Request, res: Response) {
    try {
        const workouts = await workoutsServices.getWorkouts();
        return res.status(httpStatus.OK).send(workouts);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
          return res.sendStatus(httpStatus.BAD_REQUEST);
    }
};

export async function getUserWorkouts(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;

        const workouts = await workoutsServices.getUserWorkouts(userId);
        return res.status(httpStatus.OK).send(workouts);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    };    
};

export async function postWorkout(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { name } = req.body;

        const workout = await workoutsServices.createWorkout(name, userId);
        return res.status(httpStatus.CREATED).send(workout);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
};

export async function deleteWorkout(req: AuthenticatedRequest, res: Response) {
    try {
        const { workoutId } = req.params;
        const { userId } = req;
        const numWorkoutId = Number(workoutId)

        const workout = await workoutsServices.deleteWorkout(numWorkoutId,userId);
        return res.status(httpStatus.OK).send(workout)
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        return res.sendStatus(httpStatus.BAD_REQUEST);    
    }    
};

export async function updateWorkout(req: AuthenticatedRequest, res: Response) {
    try {
        const { name } = req.body;
        const { workoutId } = req.params;
        const { userId } = req;
        const numWorkoutId = Number(workoutId);

        const workout = await workoutsServices.updateWorkout(numWorkoutId,name,userId);
        return res.status(httpStatus.OK).send(workout);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        return res.sendStatus(httpStatus.BAD_REQUEST); 
    }    
}

export async function getUserWorkoutsExercise(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { workoutId } = req.params;
        const numWorkoutId = Number(workoutId);

        const workoutExercises = await workoutsServices.getUserWorkoutsExercisesById(numWorkoutId, userId);
        return res.status(httpStatus.OK).send(workoutExercises);

    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        return res.sendStatus(httpStatus.BAD_REQUEST); 
    }    
}

export async function postWorkoutExercise(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { workoutId } = req.params;
        const numWorkoutId = Number(workoutId);
        const { name, series, reps, weight_current, weight_previous} = req.body;

        const workoutExercise = await workoutsServices.createWorkoutExercise({name,series,reps,weight_current,weight_previous, userId, workoutId: numWorkoutId});
        return res.status(httpStatus.CREATED).send(workoutExercise)

    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
};

export async function updateWorkoutExercise(req: AuthenticatedRequest, res: Response) {
    try {
        const { name, series, reps, weight_current} = req.body;
        const { userId } = req;
        const { exerciseId } = req.params;
        const numExerciseId = Number(exerciseId)

        const workoutExercise = await workoutsServices.updateWorkoutExercise({name,series,reps,weight_current}, numExerciseId, userId);
        return res.status(httpStatus.OK).send(workoutExercise[1]);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        return res.sendStatus(httpStatus.BAD_REQUEST); 
    }    
}