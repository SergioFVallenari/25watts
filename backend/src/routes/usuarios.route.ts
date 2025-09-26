import Router from 'express';
import { altaUsuarios } from '../controllers/usuarios.controller';

const router = Router();

router.post('/usuarios', altaUsuarios);

export default router;