import { objectIdSchema } from '../schemas/objectIdSchema.js';

export default function validateObjectId(req, res, next) {
  const { id } = req.params;

  const validate = objectIdSchema.validate(id);
  if (validate.error) {
    return res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));
  }
  next();
}
