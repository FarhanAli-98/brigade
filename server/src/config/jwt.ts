import crypto from 'crypto';

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
  RESET_TOKEN_SECRET,
  RESET_TOKEN_EXPIRES
} = process.env;

const ACCESS_SECRET: string = ACCESS_TOKEN_SECRET || crypto.randomBytes(64).toString('hex');

const ACCESS_EXPIRES: string | number = ACCESS_TOKEN_EXPIRES || '30m';

const REFRESH_SECRET: string = REFRESH_TOKEN_SECRET || crypto.randomBytes(64).toString('hex');

const REFRESH_EXPIRES: string = REFRESH_TOKEN_EXPIRES || '30d';

const RESET_SECRET: string = RESET_TOKEN_SECRET || crypto.randomBytes(64).toString('hex');

const RESET_EXPIRES: string = RESET_TOKEN_EXPIRES || '20m';

export {
  ACCESS_SECRET,
  ACCESS_EXPIRES,
  REFRESH_SECRET,
  REFRESH_EXPIRES,
  RESET_SECRET,
  RESET_EXPIRES
};