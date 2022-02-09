import bcrypt from 'bcrypt';
import db from '../databaseConnect.js';
import Jwt from 'jsonwebtoken';
import { userSchema } from '../schemas/userSchema.js';
import dotenv from 'dotenv';

dotenv.config();

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection('users').findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const session = await db
        .collection('sessions')
        .insertOne({ userId: user._id });

      if (!session.acknowledged) return res.sendStatus(500);

      const sessionId = { sessionId: session.insertedId.toHexString() };
      const secretKey = process.env.JWT_SECRET_KEY;
      const options = { expiresIn: 60 * 60 * 24 * 30 };

      const token = Jwt.sign(sessionId, secretKey, options);

      return res.send(token);
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Erro interno do servidor');
  }
}

export async function register(req, res) {
  const user = req.body;

  if (user.confirmPassword) {
    delete user.confirmPassword;
  }

  const validate = userSchema.validate(user, { abortEarly: false });
  if (validate.error) {
    return res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));
  }

  try {
    const isCreated = await db
      .collection('users')
      .findOne({ email: user.email });
    if (isCreated) {
      return res.status(409).send('Email já cadastrado');
    }
    await db.collection('users').insertOne({
      ...user,
      password: bcrypt.hashSync(user.password, parseInt(process.env.SALT)),
    });
  } catch {
    return res.status(500).send('Erro interno do servidor');
  }

  res.sendStatus(201);
}
