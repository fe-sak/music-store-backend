import db from '../databaseConnect.js';
import Jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function (req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace('JWT ', '');
  if (!token) return res.sendStatus(401);

  try {
    const decodedToken = Jwt.verify(token, process.env.SECRET_KEY);
    const sessionId = decodedToken.sessionId;

    const session = await db
      .sessions
      .findOne({ _id: new ObjectId(sessionId) });
    if (!session) return res.sendStatus(401);

    const user = await db.users.findOne({ _id: session.userId });
    if (!user) return res.sendStatus(401);

    delete user.password;
    res.locals.user = user;
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
  console.log('yay');
  next();
}
