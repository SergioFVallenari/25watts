import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
const JWT_SECRET = config.JWT_SECRET;
export interface CustomRequest extends Request {
  user?: string | jwt.JwtPayload;
}
export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      info: false,
      msg: 'Token no proporcionado o inválido',
      content: [],
    });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      info: false,
      msg: 'Token inválido o expirado',
      content: [],
    });
  }
};
