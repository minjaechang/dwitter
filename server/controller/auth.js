import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Make it secure!
const bcryptSalt = parseInt(process.env.BCRYPT_SALT);
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiresInSec = parseInt(process.env.JWT_EXPIRES_SEC);

export async function signup(req, res, next) {
  const { username, password, name, email } = req.body;

  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }

  const hashed = await bcrypt.hash(password, bcryptSalt);
  const newUser = {
    username,
    password: hashed,
    name,
    email,
  };
  const userId = await userRepository.createUser(newUser);

  const token = createJwtToken(userId);

  res.status(201).json({ username, token });
}

export async function login(req, res, next) {
  const { username, password } = req.body;

  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(404).json({ message: 'Invalid user or password' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(404).json({ message: 'Invalid user or password' });
  }

  const token = createJwtToken(user.id);

  res.status(201).json({ username, token });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, {
    expiresIn: jwtExpiresInSec,
  });
}
