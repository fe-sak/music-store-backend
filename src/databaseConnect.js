import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

await mongoClient.connect();

const db = {
  users: mongoClient.db('').collection('users'),
  sessions: mongoClient.db('').collection('sessions'),
  products: mongoClient.db('').collection('products'),
  finishOrders: mongoClient.db('').collection('finishOrders'),
};
export default db;
