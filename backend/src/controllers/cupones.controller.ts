import { Request, Response } from 'express';
import z from 'zod';
import config from '../config/config';
import { exec_sp_to_json } from '../config/db';
const altaSchema = z.object({
    codigo: z.string().min(1, "Obligatorio"),
    descripcion: z.string().min(1, "Obligatorio"),
    valor: z.string().min(1, "Obligatorio"),
    fecha_expiracion: z.string().min(1, "Obligatorio"),
    estado: z.string().min(1, "Obligatorio"),
})
export const altaCupones = async (req: Request, res: Response) => {
    try {
        const validatedData = altaSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ message: "Datos inválidos" });
        }
        await exec_sp_to_json(`${config.SP_PREFIJO}_insert_cupones`, validatedData.data);
        res.status(201).json({ info: true, message: "Cupón creado", data: validatedData.data });
    } catch (error: any) {
        res.status(400).json({ message: "Error al crear el cupón", error: error.errors });
    }
}
export const updateCupones = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const validatedData = altaSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ info: false, message: "Datos inválidos", error: validatedData.error.flatten().fieldErrors });
        }
        await exec_sp_to_json(`${config.SP_PREFIJO}_update_cupones`, { id, ...validatedData.data });
        res.status(200).json({ info: true, message: "Cupón actualizado", data: validatedData.data });
    } catch (error:any) {
        res.status(400).json({ info: false, message: "Error al actualizar el cupón", error: error.errors });
    }
}
export const getCuponesGrid = async (req: Request, res: Response) => {
    try {
        const response = await exec_sp_to_json(`${config.SP_PREFIJO}_get_cupones_grid`, {});
        res.status(200).json({ info: true, message: "Lista de cupones", content: response });
    } catch (error) {
        res.status(500).json({ info: false, message: "Error al obtener la lista de cupones", error });
    }
}
export const getCuponesById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await exec_sp_to_json(`${config.SP_PREFIJO}_get_cupones_by_id`, { id });
        res.status(200).json({ info: true, message: "Cupón encontrado", content: response });
    } catch (error) {
        res.status(500).json({ info: false, message: "Error al obtener el cupón", error });
    }
}