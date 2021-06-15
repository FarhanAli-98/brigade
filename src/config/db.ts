import { ENV } from '../config';
import { ConnectionOptions } from 'mongoose';

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_DB_NAME,
  MONGO_HOST,
  MONGO_PORT
} = process.env;

const MONGO_OPTIONS: ConnectionOptions = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let MONGO_URI: string = "";

ENV == 'docker'

  ? MONGO_URI = `mongodb://mongo:27017/giraffe`
  : MONGO_URI = `mongodb+srv://faizan:CatsAndRainbows666@cluster0.ffusd.mongodb.net/Giraffe?retryWrites=true&w=majority`;
//? MONGO_URI = `mongodb://mongo:${MONGO_PORT}/${MONGO_DB_NAME}`
//: MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

console.log(MONGO_URI);
export {
  MONGO_URI,
  MONGO_OPTIONS
};
