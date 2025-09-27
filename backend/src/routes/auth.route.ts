import Router from 'express';
import { decodedToken, loginAuth } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/verifiyToken';
const router = Router();

/*
    * @swagger
    * tags:
    *   - name: Auth
    *     description: Operaciones relacionadas con la autenticación
*/

/**
 * @swagger
 * /api/login:
 *  post:
 *    tags: [Auth]
 *    summary: Iniciar sesión
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                example: "juan.perez@example.com"
 *              password:
 *                type: string
 *                format: password
 *                example: "password123"
 *    responses:
 *      200:
 *        description: Inicio de sesión exitoso
 *      401:
 *        description: Credenciales inválidas
 *      500:
 *        description: Error en el servidor
 */

router.post('/login', loginAuth);
router.get('/decodedToken', verifyToken, decodedToken);
export default router;
