import express from 'express';
import { TaskService } from '../services/TaskService';
import { TaskController } from '../controllers/TaskController';
import { ApiTaskProvider } from '../providers/ApiTaskProvider';
import {LARAVEL_API} from "../config/config";

const router = express.Router();
const taskProvider = new ApiTaskProvider(LARAVEL_API);
const taskService = new TaskService(taskProvider);
const taskController = new TaskController(taskService);

// GET all tasks
router.get('/', (req, res) => taskController.getTasks(req, res));

// POST create task
router.post('/', (req, res) => taskController.createTask(req, res));

// PUT update task
router.put('/:id', (req, res) => taskController.updateTask(req, res));

// DELETE task
router.delete('/:id', (req, res) => taskController.deleteTask(req, res));

export default router;
