import { Request, Response } from 'express';
import { ProjectService } from '../services/ProjectService';

export class ProjectController {
    constructor(private projectService: ProjectService) {}

    async getProjects(req: Request, res: Response) {
        try {
            const projects = await this.projectService.fetchProjects();
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching projects', error });
        }
    }

    async createProject(req: Request, res: Response) {
        try {
            const newProject = await this.projectService.createProject(req.body);
            res.status(201).json(newProject);
        } catch (error) {
            res.status(500).json({ message: 'Error creating project', error });
        }
    }

    async updateProject(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedProject = await this.projectService.updateProject(parseInt(id), req.body);
            res.status(200).json(updatedProject);
        } catch (error) {
            res.status(500).json({ message: 'Error updating project', error });
        }
    }

    async deleteProject(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.projectService.deleteProject(parseInt(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting project', error });
        }
    }
}
