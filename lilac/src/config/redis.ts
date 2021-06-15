import { ENV } from './index';

const {
  CACHE_PORT,
  CACHE_HOST,
  CACHE_IP_FAMILY,
  CACHE_DB,
  CACHE_PASSWORD
} = process.env;

export const REDIS_PORT: number = parseInt(CACHE_PORT!) || 5000;

export const REDIS_HOST: string = (ENV == 'docker') ? "redis" :CACHE_HOST! || "127.0.0.1";

export const REDIS_PASSWORD: string = CACHE_PASSWORD!;

export const REDIS_IP_FAMILY: number = parseInt(CACHE_IP_FAMILY!) || 4;

export const REDIS_DB: number = parseInt(CACHE_DB!) || 0;