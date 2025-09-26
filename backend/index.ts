import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './src/swagger/swagger';
import cuponesRoutes from './src/routes/cupones.route';
import usuariosRouter from './src/routes/usuarios.route';
import authRouter from './src/routes/auth.route';
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', cuponesRoutes);
app.use('/api', usuariosRouter);
app.use('/api', authRouter);
app.get('/', (_req, res) => { res.send('API running 🚀') });

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📚 Swagger docs on http://localhost:${PORT}/swagger`);
});
