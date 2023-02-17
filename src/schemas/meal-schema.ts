import joi from 'joi';

const mealSchema = joi.object({
    name: joi.string().required().max(50)
});

const mealsSchema = {
    mealSchema
};

export default mealsSchema;