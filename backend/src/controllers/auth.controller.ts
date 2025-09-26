import { Request, Response } from 'express';
import z from 'zod';
import { hashPassword } from '../helpers';
import config from '../config/config';
import { exec_sp_to_json } from '../config/db';
import jwt from 'jsonwebtoken';

const login = z.object({
    email: z.string().min(1, "Obligatorio"),
    password: z.string().min(1, "Obligatorio"),
});

export const loginAuth = async (req: Request, res: Response) => {
    try {
        const validatedData = login.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ message: "Datos inválidos" });
        }
        const { email, password } = validatedData.data;
        const passwordHash = hashPassword(password);
        const response = await exec_sp_to_json(`${config.SP_PREFIJO}_login`, { email, password: passwordHash });
        return res.status(200).json({
            info: true,
            msg: "Login exitoso",
            data: { token: jwt.sign({ email, password }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION}) }
        });
    } catch (error: any) {
        return res.status(500).json({info:false, message: "Error interno del servidor", error: error.message });
    }
}