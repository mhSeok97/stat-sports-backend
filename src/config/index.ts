import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

export const CORS_CREDENTIALS = process.env.CORS_CREDENTIALS === 'true';
export const LOG_FORMAT: 'combined' | 'dev' = process.env.LOG_FORMAT as 'combined' | 'dev';
export const { NODE_ENV, PORT, LOG_DIR, CORS_ORIGIN, NCSR_ENDPOINT } = process.env;
// export const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
