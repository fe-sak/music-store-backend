import { ObjectId } from 'mongodb';
import db from '../databaseConnect.js';

export async function getProduct(req, res) {
  const { id: productId } = req.params;
  console.log('A');
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
