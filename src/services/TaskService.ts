import { ITask, ITaskProvider } from '../interfaces/ITaskProvider';

export class TaskService {
    constructor(private taskProvider: ITaskProvider) {}

    async fetchTasks(): Promise<ITask[]> {
        return await this.taskProvider.getTasks();
    }

    async createTask(task: ITask): Promise<ITask> {
        return await this.taskProvider.createTask(task);
    }

    async updateTask(taskId: number, task: ITask): Promise<ITask> {
        return await this.taskProvider.updateTask(taskId, task);
    }

    async deleteTask(taskId: number): Promise<void> {
        await this.taskProvider.deleteTask(taskId);
    }
}
