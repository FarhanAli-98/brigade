import Redis from 'ioredis';
import {
  REDIS_PORT,
  REDIS_HOST,
  REDIS_DB,
  REDIS_IP_FAMILY,
} from './config'

const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST ,
  family: REDIS_IP_FAMILY, // 4 (IPv4) or 6 (IPv6)
  db: REDIS_DB,
});


export {
  redis,
};