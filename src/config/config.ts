import dotenv from 'dotenv';
dotenv.config();

export const LARAVEL_API = process.env.LARAVEL_API || 'http://localhost:8080/api';
