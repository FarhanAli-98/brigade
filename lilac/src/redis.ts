import Redis from 'ioredis';
import {
  REDIS_PORT,
  REDIS_DB,
  REDIS_IP_FAMILY,
  REDIS_PASSWORD
} from './config'

const redis = new Redis({
  port: REDIS_PORT,
  host: 'redis',
  family: REDIS_IP_FAMILY, // 4 (IPv4) or 6 (IPv6)
  db: REDIS_DB,
  //password: REDIS_PASSWORD
});


export {
  redis,
};