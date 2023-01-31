import joi from 'joi';

const userSchema = joi.object({
    name: joi.string().required().max(50),
    email: joi.string().required(),
    password: joi.string().required()
});

const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
})

const authSchema = {
    userSchema,
    loginSchema
};

export default authSchema;