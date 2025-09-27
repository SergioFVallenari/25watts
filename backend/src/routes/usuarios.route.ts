import Router from 'express';
import { altaUsuarios } from '../controllers/usuarios.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Operaciones relacionadas con usuarios
 */
/**
/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     tags: [Usuarios]
 *     summary: Crear un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juan.perez@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error en el servidor
 */

router.post('/usuarios', altaUsuarios);

export default router;