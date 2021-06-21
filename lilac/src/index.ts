import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose'
import {MONGO_URI,REDIS_IP_FAMILY,REDIS_DB,REDIS_PORT} from './config';

import { httpServer } from './io';
import { APP_PORT } from './config';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
  console.log(MONGO_URI);
  httpServer.listen(APP_PORT, () => {
    console.log(`Lilac running on Port: ${APP_PORT}`)
  });
})
.catch((err) => {});

