import { Router } from 'express';
import { body } from 'express-validator';

import {
  createPaciente,
  deletePaciente,
  getPacienteById,
  listPacientes,
  updatePaciente
} from '../controllers/pacientes.controller.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

router.get('/', listPacientes);
router.get('/:id', getPacienteById);

router.post(
  '/',
  [
    body('documento').notEmpty().withMessage('Documento es requerido'),
    body('nombre').notEmpty().withMessage('Nombre es requerido'),
    body('apellido').notEmpty().withMessage('Apellido es requerido'),
    validateRequest
  ],
  createPaciente
);

router.put('/:id', updatePaciente);
router.delete('/:id', deletePaciente);

export default router;
