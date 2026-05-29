import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import env from '../config/env.js';
import { pool } from '../config/db.js';
import asyncHandler from '../utils/asyncHandler.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query(
    'SELECT id_usuario, nombre, apellido, email, password, rol FROM usuarios WHERE email = ? LIMIT 1',
    [email]
  );

  const user = rows[0];

  if (!user) {
    return res.status(401).json({ message: 'Credenciales invalidas' });
  }

  let isValidPassword = false;

  if (typeof user.password === 'string' && user.password.startsWith('$2')) {
    isValidPassword = await bcrypt.compare(password, user.password);
  } else {
    isValidPassword = password === user.password;
  }

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Credenciales invalidas' });
  }

  const token = jwt.sign(
    {
      userId: user.id_usuario,
      email: user.email,
      rol: user.rol
    },
    env.jwtSecret,
    { expiresIn: '8h' }
  );

  return res.json({
    token,
    usuario: {
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      rol: user.rol
    }
  });
});
