import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: Number(process.env.PORT) || 3000,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: Number(process.env.DB_PORT) || 3306,
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || '12345',
  dbName: process.env.DB_NAME || 'sistema_citas_medicas',
  jwtSecret: process.env.JWT_SECRET || 'super_secret_change_me'
};

export default env;
