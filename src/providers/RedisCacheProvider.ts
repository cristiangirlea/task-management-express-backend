import { createClient } from 'redis';
import { ICacheProvider } from '../interfaces/ICacheProvider';

export class RedisCacheProvider implements ICacheProvider {
    private client;

    constructor() {
        this.client = createClient({ url: 'redis://127.0.0.1:6379' });
        this.client.connect().catch(console.error);
    }

    async set(key: string, value: string, ttl: number): Promise<void> {
        await this.client.setEx(key, ttl, value);
    }

    async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    async has(key: string): Promise<boolean> {
        const value = await this.client.get(key);
        return value !== null;
    }
}
