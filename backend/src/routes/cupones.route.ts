import Router from 'express';
import { altaCupones, canjearCupon, deleteCupones, getAllCupones, getCuponesById, getCuponesGrid, updateCupones } from '../controllers/cupones.controller';
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
 *                 type: string
 *                 example: "10.0"
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
 *   get:
 *     tags: [Cupones]
 *     summary: Obtener lista de cupones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cupones obtenida exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */

router.get('/cupones', verifyToken, getCuponesGrid);
/**
 * @swagger
 * /api/cupones/{id}:
 *   get:
 *     tags: [Cupones]
 *     summary: Obtener un cupón por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cupón
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cupón obtenido exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cupón no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/cupones/:id', verifyToken, getCuponesById);
/**
 * @swagger
 * /api/cupones/{id}:
 *   put:
 *     tags: [Cupones]
 *     summary: Actualizar un cupón por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cupón
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: "CUPON2024"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción del cupón"
 *               valor:
 *                 type: string
 *                 example: "10.0"
 *               fecha_expiracion:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *               estado:
 *                 type: string
 *                 example: "activo"
 *     responses:
 *       200:
 *         description: Cupón actualizado exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cupón no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/cupones/:id', verifyToken, updateCupones);
/**
 * @swagger
 * /api/cupones/{id}:
 *   delete:
 *     tags: [Cupones]
 *     summary: Eliminar un cupón por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cupón
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cupón eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cupón no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/cupones/:id', verifyToken, deleteCupones);
router.get('/allcupones', verifyToken, getAllCupones);
router.post('/canjear-cupon', verifyToken, canjearCupon);
export default router;
