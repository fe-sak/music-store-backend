import db from '../databaseConnect.js';
import Jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export default async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('JWT ', '');
  console.log(process.env.SECRET_KEY);
  if (!token) return res.sendStatus(401);

  try {
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    const sessionId = decodedToken.sessionId;

    const session = await db
      .collection('sessions')
      .findOne({ _id: new ObjectId(sessionId) });
    if (!session) return res.sendStatus(401);

    const user = await db.collection('users').findOne({ _id: session.userId });
    if (!user) return res.sendStatus(401);

    delete user.password;
    res.locals.user = user;
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
  next();
}
