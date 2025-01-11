import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
    constructor(private taskService: TaskService) {}

    async getTasks(req: Request, res: Response) {
        try {
            const tasks = await this.taskService.fetchTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching tasks', error });
        }
    }

    async createTask(req: Request, res: Response) {
        try {
            const newTask = await this.taskService.createTask(req.body);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: 'Error creating task', error });
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedTask = await this.taskService.updateTask(parseInt(id), req.body);
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: 'Error updating task', error });
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.taskService.deleteTask(parseInt(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting task', error });
        }
    }
}
