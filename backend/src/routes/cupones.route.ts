import Router from 'express';
import { altaCupones, getCuponesById, getCuponesGrid, updateCupones } from '../controllers/cupones.controller';
import { verifyToken } from '../middleware/verifiyToken';
const router = Router();
/**
 * @swagger
 * tags:
 *   - name: Cupones
 *     description: Operaciones relacionadas con cupones
 */
/**
 * @swagger
 * /api/cupones:
 *   post:
 *     tags: [Cupones]
 *     summary: Crear un nuevo cupón
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - descripcion
 *               - valor
 *               - fecha_expiracion
 *               - estado
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: "CUPON2024"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción del cupón"
 *               valor:
 *                 type: number
 *                 example: 10.0
 *               fecha_expiracion:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *               estado:
 *                 type: string
 *                 example: "activo"
 * 
 *     responses:
 *       200:
 *         description: Cupón creado exitosamente
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error en el servidor
 */
router.post('/cupones', verifyToken, altaCupones);
/**
 * @swagger
 * /api/cupones:
 *  get:
 *    tags: [Cupones]
 *    summary: Obtener lista de cupones
 */
router.get('/cupones', verifyToken, getCuponesGrid);
router.get('/cupones/:id', verifyToken, getCuponesById);
router.put('/cupones/:id', verifyToken, updateCupones);
export default router;
