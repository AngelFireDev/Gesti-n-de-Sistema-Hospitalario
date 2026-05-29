import jwt from 'jsonwebtoken';
import env from '../config/env.js';

function authenticateToken(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  const token = authorization.slice(7);

  try {
    req.user = jwt.verify(token, env.jwtSecret);
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalido o expirado' });
  }
}

export default authenticateToken;
