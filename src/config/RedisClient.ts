import { createClient } from 'redis';

const redisClient = createClient({ url: 'redis://127.0.0.1:6379' });

redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.error('Redis error:', err));

export const connectRedis = async () => {
    await redisClient.connect();
};

export default redisClient;
