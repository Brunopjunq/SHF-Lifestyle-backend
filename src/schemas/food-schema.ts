import joi from 'joi';

export const foodSchema = joi.object({
    name: joi.string().required().max(150),
    quantity: joi.number().min(0).required(),
    calories: joi.number().required().min(0),
    protein: joi.number(),
    carbohydrate: joi.number(),
    lipid: joi.number()
});