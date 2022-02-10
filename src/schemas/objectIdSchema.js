import Joi from 'joi';

export const objectIdSchema = Joi.string().length(24);
