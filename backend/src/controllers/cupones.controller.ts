import { Request, Response } from 'express';
import z from 'zod';
import config from '../config/config';
import { exec_sp_to_json } from '../config/db';
import { CustomRequest } from '../middleware/verifiyToken';
const altaSchema = z.object({
    codigo: z.string().min(1, "Obligatorio"),
    descripcion: z.string().min(1, "Obligatorio"),
    valor: z.string().min(1, "Obligatorio"),
    fecha_expiracion: z.string().min(1, "Obligatorio"),
    estado: z.string().min(1, "Obligatorio"),
})
const canjeCupon = z.object({
    codigo: z.string().min(1, "Obligatorio"),
})
export const altaCupones = async (req: CustomRequest, res: Response) => {
    try {
        const datosUsuario:any = req.user;
        console.log('Datos del usuario desde el token:', datosUsuario);
        const validatedData = altaSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ message: "Datos inválidos" });
        }
        await exec_sp_to_json(`${config.SP_PREFIJO}_insert_cupones`, { ...validatedData.data, idusuario: datosUsuario.id });
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
export const deleteCupones = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await exec_sp_to_json(`${config.SP_PREFIJO}_delete_cupones`, { id });
        res.status(200).json({ info: true, message: "Cupón eliminado" });
    } catch (error) {
        res.status(400).json({ info: false, message: "Error al eliminar el cupón", error });
    }
}
export const getCuponesGrid = async (req: CustomRequest, res: Response) => {
    try {
        const datosUsuario: any = req.user;
        console.log('Datos del usuario desde el token:', datosUsuario);
        const response = await exec_sp_to_json(`${config.SP_PREFIJO}_get_cupones_grid`, {idusuario:datosUsuario.id});
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
export const getAllCupones = async (req: Request, res: Response) => {
    try {
        const response = await exec_sp_to_json(`${config.SP_PREFIJO}_get_all_cupones`, {});
        res.status(200).json({ info: true, message: "Lista de cupones", content: response });
    } catch (error) {
        res.status(500).json({ info: false, message: "Error al obtener la lista de cupones", error });
    }
}
export const canjearCupon = async (req: CustomRequest, res: Response) => {
    try {
        const canjeValidation = canjeCupon.safeParse(req.body);
        if (!canjeValidation.success) {
            return res.status(400).json({ info: false, message: "Datos inválidos", error: canjeValidation.error.flatten().fieldErrors });
        }
        await exec_sp_to_json(`${config.SP_PREFIJO}_canjear_cupon`, { ...canjeValidation.data });
        res.status(200).json({ info: true, message: "Cupón canjeado"});

    } catch (error:any) {
        console.log(error.response);
        res.status(400).json({ info: false, message: error.message||"Error al canjear el cupón",  });
    }
}