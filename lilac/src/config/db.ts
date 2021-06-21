import { ENV } from '../config';
import { ConnectionOptions } from 'mongoose';

const MONGO_OPTIONS: ConnectionOptions = {

  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let MONGO_URI: string = "";
ENV == 'docker'

  ? MONGO_URI = `mongodb://mongo:27017/brigade`
  : MONGO_URI = `mongodb+srv://farhandb:farhandb1@cluster0.0okjq.mongodb.net/farhan`;
export {
  MONGO_URI,
  MONGO_OPTIONS
};
