import { Router } from 'express';

import authRoutes from './auth.routes.js';
import citasRoutes from './citas.routes.js';
import historialRoutes from './historial.routes.js';
import hospitalesRoutes from './hospitales.routes.js';
import medicosRoutes from './medicos.routes.js';
import pacientesRoutes from './pacientes.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'API de sistema de citas medicas' });
});

router.use('/auth', authRoutes);
router.use('/pacientes', pacientesRoutes);
router.use('/medicos', medicosRoutes);
router.use('/hospitales', hospitalesRoutes);
router.use('/citas', citasRoutes);
router.use('/historial', historialRoutes);

export default router;
