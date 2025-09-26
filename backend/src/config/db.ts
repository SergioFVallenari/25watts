import { Sequelize } from 'sequelize';
import config from './config';
const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  port: config.DB_PORT,
  dialect: config.DB_DIALECT as 'mysql' | 'mariadb' | 'postgres' | 'sqlite' | 'mssql',
  logging: config.DB_LOG,
  define: {
    timestamps: true, 
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
  timezone: config.DB_TIMEZONE,
});
/**
 * Ejecuta un stored procedure y devuelve el resultado como JSON.
 * @param spName - Nombre del procedimiento almacenado
 * @param params - Objeto con parámetros { nombre: valor }
 * @returns Promise<any[]> - Resultado del SP
 */
export async function exec_sp_to_json(
  spName: string,
  params: Record<string, any> = {}
): Promise<any[]> {
  const keys = Object.keys(params);
  const placeholders = keys.map((key) => `:${key}`).join(', ');
  const query = `CALL ${spName}(${placeholders})`;
  try {
    const result: any = await sequelize.query(query, {
      replacements: params,
    });
    const rows = Array.isArray(result) ? result : [];
    return rows;
  } catch (error) {
    console.error(`Error al ejecutar SP '${spName}':`, error);
    throw error;
  }
}
