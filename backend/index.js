import logger from './src/core/config/logger.js';
import { app } from './src/app.js';
import { port } from './src/core/config/config.js';

app.listen(port, () => {
  logger.info(`Quran API running on port ${port}`);
});
