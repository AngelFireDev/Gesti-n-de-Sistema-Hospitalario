import { Router } from 'express';
import { body } from 'express-validator';

import { login } from '../controllers/auth.controller.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email invalido'),
    body('password').notEmpty().withMessage('Password es requerido'),
    validateRequest
  ],
  login
);

export default router;
