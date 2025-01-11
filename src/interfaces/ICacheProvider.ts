export interface ICacheProvider {
    set(key: string, value: string, ttl: number): Promise<void>;
    get(key: string): Promise<string | null>;
    has(key: string): Promise<boolean>;
}
