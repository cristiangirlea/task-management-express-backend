import dotenv from 'dotenv';
dotenv.config();

console.log('Laravel API:',process.env.LARAVEL_API);
export const LARAVEL_API = process.env.LARAVEL_API || 'http://localhost:8080/api';
