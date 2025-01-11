import axios, { AxiosRequestConfig } from 'axios';
import { generateVerificationHeaders } from './generateVerificationHeaders';

export class ConnectionManager {
    private static instance: ConnectionManager;
    private baseURL: string;

    private constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    public static getInstance(baseURL: string): ConnectionManager {
        if (!ConnectionManager.instance) {
            ConnectionManager.instance = new ConnectionManager(baseURL);
        }
        return ConnectionManager.instance;
    }

    // Handle requests with verification headers
    public async request(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        endpoint: string,
        data: any = {},
        config: AxiosRequestConfig = {}
    ): Promise<any> {
        const headers = await generateVerificationHeaders(); // Get headers

        const axiosConfig: AxiosRequestConfig = {
            method,
            url: `${this.baseURL}${endpoint}`,
            headers: {
                ...headers, // Add verification headers
                ...config.headers // Merge additional headers
            },
            data: method === 'GET' ? undefined : data // No body for GET requests
        };

        try {
            const response = await axios(axiosConfig);
            return response.data;
        } catch (error) {
            console.error('Error in Axios request:', error);
            throw error;
        }
    }
}
