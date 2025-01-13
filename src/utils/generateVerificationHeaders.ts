import crypto from 'crypto';
import { createClient } from 'redis';
import { LRUCache } from 'lru-cache'; // Correct named import

const SECRET_KEY = process.env.SECRET_KEY || 'my-secure-key';

// Redis client setup (singleton)
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379',
});
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.error('Redis error:', err));

(async () => {
    await redisClient.connect();
})();

// LRU cache for replay attack prevention
const nonceCache = new LRUCache<string, boolean>({
    max: 1000, // Store up to 1000 nonces
    ttl: 60 * 1000 // Expiration time 60 seconds
});

// Generate HMAC verification headers
export const generateVerificationHeaders = async (): Promise<Record<string, string>> => {
    const timestamp = Math.floor(Date.now() / 1000).toString(); // Current time in seconds
    const nonce = crypto.randomBytes(16).toString('hex'); // Random nonce

    const payload = `${timestamp}:${nonce}`;
    const hash = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');

    // Store nonce in Redis and LRU cache for replay protection
    if (!nonceCache.has(nonce)) {
        nonceCache.set(nonce, true); // Store nonce in-memory
        try {
            await redisClient.setEx(nonce, 60, 'used'); // Store nonce in Redis with 60s TTL
        } catch (error) {
            console.error('Failed to store nonce in Redis:', error);
        }
    }

    return {
        'X-TIMESTAMP': timestamp,
        'X-NONCE': nonce,
        'X-HASH': hash
    };
};
