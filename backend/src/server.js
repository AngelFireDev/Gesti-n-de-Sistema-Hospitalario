import app from './app.js';
import { checkDbConnection } from './config/db.js';
import env from './config/env.js';

async function startServer() {
  try {
    await checkDbConnection();
    app.listen(env.port, () => {
      console.log(`Backend ejecutandose en http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('No fue posible iniciar el backend:', error.message);
    process.exit(1);
  }
}

startServer();
