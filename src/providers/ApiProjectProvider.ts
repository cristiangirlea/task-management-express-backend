import { IProjectProvider } from '../interfaces/IProjectProvider';
import { ConnectionManager } from '../utils/connectionManager';

export class ApiProjectProvider implements IProjectProvider {
    private readonly connectionManager: ConnectionManager;

    constructor(baseUrl: string) {
        this.connectionManager = ConnectionManager.getInstance(baseUrl); // Get or create ConnectionManager instance
    }

    async getAllProjects(): Promise<any[]> {
        try {
            return await this.connectionManager.request('GET', '/projects');
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw new Error('Failed to fetch projects.');
        }
    }

    async createProject(projectData: Record<string, any>): Promise<any> {
        try {
            return await this.connectionManager.request('POST', '/projects', projectData);
        } catch (error) {
            console.error('Error creating project:', error);
            throw new Error('Failed to create project.');
        }
    }

    async updateProject(projectId: string, projectData: Record<string, any>): Promise<any> {
        try {
            return await this.connectionManager.request('PUT', `/projects/${projectId}`, projectData);
        } catch (error) {
            console.error('Error updating project:', error);
            throw new Error('Failed to update project.');
        }
    }

    async deleteProject(projectId: string): Promise<any> {
        try {
            return await this.connectionManager.request('DELETE', `/projects/${projectId}`);
        } catch (error) {
            console.error('Error deleting project:', error);
            throw new Error('Failed to delete project.');
        }
    }
}
