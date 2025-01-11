import { IProjectProvider } from '../interfaces/IProjectProvider';

export class ProjectService {
    constructor(private projectProvider: IProjectProvider) {}

    async fetchProjects(): Promise<any[]> {
        return await this.projectProvider.getAllProjects();
    }

    async createProject(projectData: Record<string, any>): Promise<any> {
        return await this.projectProvider.createProject(projectData);
    }

    async updateProject(projectId: number, projectData: Record<string, any>): Promise<any> {
        return await this.projectProvider.updateProject(projectId.toString(), projectData);
    }

    async deleteProject(projectId: number): Promise<void> {
        await this.projectProvider.deleteProject(projectId.toString());
    }
}
