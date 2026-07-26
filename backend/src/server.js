import app from './app.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`=================================================`);
  logger.info(`  SACHAI Backend Server is running on port ${PORT} `);
  logger.info(`  Health check: http://localhost:${PORT}/api/health`);
  logger.info(`=================================================`);
});
