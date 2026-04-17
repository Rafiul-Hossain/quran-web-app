import dotenv from 'dotenv';
dotenv.config();

// Server config
export const port = process.env.PORT || 5000;
export const env = process.env.NODE_ENV || 'development';
