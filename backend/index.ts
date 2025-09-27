import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './src/swagger/swagger';
import cuponesRoutes from './src/routes/cupones.route';
import usuariosRouter from './src/routes/usuarios.route';
import authRouter from './src/routes/auth.route';
import path from 'path';
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', authRouter);
app.use('/api', usuariosRouter);
app.use('/api', cuponesRoutes);

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📚 Swagger docs on http://localhost:${PORT}/swagger`);
});
