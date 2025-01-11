export interface ITaskProvider {
    getTasks(): Promise<ITask[]>;  // GET /tasks
    createTask(task: ITask): Promise<ITask>;  // POST /tasks
    updateTask(taskId: number, task: ITask): Promise<ITask>;  // PUT /tasks/:id
    deleteTask(taskId: number): Promise<void>;  // DELETE /tasks/:id
}

export interface ITask {
    id?: number;
    title: string;
    description: string;
    status: string;
}

