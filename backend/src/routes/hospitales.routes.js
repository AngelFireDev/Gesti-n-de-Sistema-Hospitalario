import { Router } from 'express';
import { body } from 'express-validator';

import {
  createHospital,
  deleteHospital,
  getHospitalById,
  listHospitales,
  updateHospital
} from '../controllers/hospitales.controller.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

router.get('/', listHospitales);
router.get('/:id', getHospitalById);

router.post(
  '/',
  [body('nombre').notEmpty().withMessage('Nombre es requerido'), validateRequest],
  createHospital
);

router.put('/:id', updateHospital);
router.delete('/:id', deleteHospital);

export default router;
