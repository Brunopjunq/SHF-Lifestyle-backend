import joi from 'joi';

const workoutSchema = joi.object({
    name: joi.string().required().max(50)
});

const workoutsSchema = {
    workoutSchema
};

export default workoutsSchema;