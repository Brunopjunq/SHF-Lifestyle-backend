import joi from 'joi';

const workoutSchema = joi.object({
    name: joi.string().required().max(50)
});

const workoutExerciseSchema = joi.object({
    name: joi.string().required().max(50),
    series: joi.number().required().min(1),
    reps: joi.number().required().min(1),
    weight_current: joi.number()
});

const workoutsSchema = {
    workoutSchema,
    workoutExerciseSchema
};

export default workoutsSchema;