import joi from 'joi';

const weightSchema = joi.object({
    weight: joi.number().required().min(0),
});

const weightsSchema = {
    weightSchema
};

export default weightsSchema;