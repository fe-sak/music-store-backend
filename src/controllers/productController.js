import { ObjectId } from 'mongodb';
import db from '../databaseConnect.js';

export async function getProduct(req, res) {
  const { id: productId } = req.params;

  try {
    const filter = { _id: new ObjectId(productId) };
    const updateDoc = { $inc: { views: 1 } };

    await db.products.updateOne(filter, updateDoc);

    const product = await db.products.findOne(filter);

    if (!product) return res.sendStatus(404);

    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function finishOrder(req, res) {
  const products = req.body.products;
  const user = res.locals.user;
  const productsIds = products.map((product) => product._id);

  const finishedOrder = { userId: user._id, productsIds };
  console.log(products);
  console.log(user);

  try {
    const promise = await db.finishOrders.insertOne(finishedOrder);
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(201);
}
