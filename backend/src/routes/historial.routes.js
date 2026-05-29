import { Router } from 'express';
import { body } from 'express-validator';

import {
  createHistorial,
  deleteHistorial,
  getHistorialById,
  listHistorial,
  listHistorialByPaciente,
  updateHistorial
} from '../controllers/historial.controller.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

router.get('/', listHistorial);
router.get('/paciente/:pacienteId', listHistorialByPaciente);
router.get('/:id', getHistorialById);

router.post(
  '/',
  [body('id_paciente').isInt({ gt: 0 }).withMessage('id_paciente es requerido'), validateRequest],
  createHistorial
);

router.put('/:id', updateHistorial);
router.delete('/:id', deleteHistorial);

export default router;
