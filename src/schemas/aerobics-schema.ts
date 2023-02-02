import joi from 'joi';

export const aerobicSchema = joi.object({
    name: joi.string().required().max(100),
    calories: joi.number().max(10000),
    time: joi.number().required()
});