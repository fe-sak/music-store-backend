import Joi from 'joi';

export const finishOrderSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  image: Joi.string().uri().required(),
  artist: Joi.string().required().max(40),
  description: Joi.string().required().max(400),
  views: Joi.number().required(),
  isRecommended: Joi.bool().required(),
  price: Joi.number().required(),
});
