import {Request, Response} from 'express';
import z from 'zod';
import { exec_sp_to_json } from '../config/db';
import config from '../config/config';
import crypto from 'crypto';
import { hashPassword } from '../helpers';

const altaSchema = z.object({
    email: z.string().min(1, "Obligatorio").email("Email inválido"),
    clave: z.string().min(6, "Mínimo 6 caracteres"),
})
export const altaUsuarios = async (req: Request, res: Response) => {
    try {
        const validatedData = altaSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ message: "Datos inválidos" });
        }
        const {email, clave } = validatedData.data;
        const clavehash = hashPassword(clave);
        await exec_sp_to_json(`${config.SP_PREFIJO}_insert_usuario`, { email, clave: clavehash });
        return res.status(201).json({ info: true, msg: "Usuario creado" });
    } catch (error:any) {
        return res.status(400).json({ message: "Error al crear el usuario", error: error.errors });
    }
}