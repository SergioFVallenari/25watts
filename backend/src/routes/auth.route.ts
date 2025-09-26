import Router from 'express';
import { loginAuth } from '../controllers/auth.controller';
const router = Router();

router.post('/login', loginAuth);

export default router;
