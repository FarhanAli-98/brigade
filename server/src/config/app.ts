const {
  PORT,
  NODE_ENV,
  HOST
} = process.env;

export const APP_PORT: string | number = PORT || 5000;

export const ENV: string = NODE_ENV!;

export const APP_HOST: string = ENV == 'development' ? `http://localhost:${APP_PORT}` : HOST!;
