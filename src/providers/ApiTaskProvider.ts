import axios from 'axios';
import { ITask, ITaskProvider } from '../interfaces/ITaskProvider';
import {ConnectionManager} from "../utils/connectionManager";

export class ApiTaskProvider implements ITaskProvider {
    private connectionManager: ConnectionManager;

    constructor(baseURL: string) {
        this.connectionManager = ConnectionManager.getInstance(baseURL);
    }

    async getTasks(): Promise<ITask[]> {
        try {
            const response = await this.connectionManager.request('GET', '/tasks');
            return response; // Assuming the Laravel API returns an array of tasks
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error; // Rethrow the error to be caught at a higher level
        }
    }

    async createTask(task: ITask): Promise<ITask> {
        try {
            const response = await this.connectionManager.request('POST', '/tasks', task);
            return response; // Return the created task
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    }

    async updateTask(taskId: number, task: ITask): Promise<ITask> {
        try {
            const response = await this.connectionManager.request('PUT', `/tasks/${taskId}`, task);
            return response; // Return the updated task
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    }

    async deleteTask(taskId: number): Promise<void> {
        try {
            const response = await this.connectionManager.request('DELETE', `/tasks/${taskId}`);
            return response; // Return success or confirmation message
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }
}


