export interface IProjectProvider {
    getAllProjects(): Promise<any[]>;
    createProject(projectData: Record<string, any>): Promise<any>;
    updateProject(projectId: string, projectData: Record<string, any>): Promise<any>;
    deleteProject(projectId: string): Promise<any>;
}
