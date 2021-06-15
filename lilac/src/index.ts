import dotenv from 'dotenv';
dotenv.config();

import { httpServer } from './io';
import { APP_PORT } from './config';

httpServer.listen(APP_PORT, () => {
  console.log(`Lilac running on Port: ${APP_PORT}`)
});
