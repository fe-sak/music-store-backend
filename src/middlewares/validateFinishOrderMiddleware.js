import { finishOrderSchema } from '../schemas/finishOrderSchema.js';

export default async function validateFinishOrder(req, res, next) {
  const products = req.body.products;
  if (!products || products.length === 0) return res.sendStatus(422);

  for (let i = 0; i < products.length; i++) {
    console.log(i);
    const validate = finishOrderSchema.validate(products[i]);
    if (validate.error) {
      return res
        .status(422)
        .send(validate.error.details.map((detail) => detail.message));
    }
  }

  next();
}
