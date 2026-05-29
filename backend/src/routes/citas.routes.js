import { Router } from 'express';
import { body } from 'express-validator';

import {
  createCita,
  deleteCita,
  getCitaById,
  listCitas,
  updateCita
} from '../controllers/citas.controller.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

router.get('/', listCitas);
router.get('/:id', getCitaById);

router.post(
  '/',
  [
    body('id_paciente').isInt({ gt: 0 }).withMessage('id_paciente es requerido'),
    body('id_medico').isInt({ gt: 0 }).withMessage('id_medico es requerido'),
    body('fecha').notEmpty().withMessage('fecha es requerida'),
    body('hora').notEmpty().withMessage('hora es requerida'),
    validateRequest
  ],
  createCita
);

router.put('/:id', updateCita);
router.delete('/:id', deleteCita);

export default router;
