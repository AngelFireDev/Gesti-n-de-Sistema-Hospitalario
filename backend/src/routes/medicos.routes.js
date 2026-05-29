import { Router } from 'express';
import { body } from 'express-validator';

import {
  createMedico,
  deleteMedico,
  getMedicoById,
  listMedicos,
  updateMedico
} from '../controllers/medicos.controller.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

router.get('/', listMedicos);
router.get('/:id', getMedicoById);

router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('Nombre es requerido'),
    body('apellido').notEmpty().withMessage('Apellido es requerido'),
    validateRequest
  ],
  createMedico
);

router.put('/:id', updateMedico);
router.delete('/:id', deleteMedico);

export default router;
