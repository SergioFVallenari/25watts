import dotenv from 'dotenv';
dotenv.config();
const config = {
  PLATAFORMA : process.env.PLATAFORMA || '25watts',
  ENV : process.env.ENV || 'testing',
  PORT : process.env.PORT || 4000,
  DB_NAME : process.env.DB_NAME || 'nombre_base',
  DB_USER : process.env.DB_USER || 'usuario',
  DB_PASSWORD : process.env.DB_PASSWORD || 'clave',
  DB_DIALECT : process.env.DB_DIALECT || 'mariadb',
  DB_HOST : process.env.DB_HOST || 'localhost',
  DB_PORT : Number(process.env.DB_PORT) || 3306,
  DB_TIMEZONE : process.env.DB_TIMEZONE || '-03:00',
  DB_LOG : process.env.DB_LOG === 'true',
  SP_PREFIJO : process.env.SP_PREFIJO || 'testing',
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '365d',
};
export default config;
