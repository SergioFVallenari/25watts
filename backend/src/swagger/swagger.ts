import { Options } from 'swagger-jsdoc';
import pkg from '../../package.json';
import config from '../config/config';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: pkg.name,
      version: pkg.version,
      description: 'Swagger API documentacion para 25watts',
      contact: {
        name: 'Sergio Vallenari',
        url: 'https://www.linkedin.com/in/sergiovallenari',
        email: 'vallenarisergio@gmail.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Servidor local',
      },
      {
        url: 'https://watts-724067888579.southamerica-west1.run.app',
        description: 'Servidor de test',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['src/routes/*.ts']
};
