import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';
import { ApiProjectProvider } from '../providers/ApiProjectProvider';
import { ProjectService } from '../services/ProjectService';

const router = Router();
const projectProvider = new ApiProjectProvider(process.env.LARAVEL_API || 'http://localhost:8000/api');
const projectService = new ProjectService(projectProvider);
const projectController = new ProjectController(projectService);

router.get('/', (req, res) => projectController.getProjects(req, res));
router.post('/', (req, res) => projectController.createProject(req, res));
router.put('/:id', (req, res) => projectController.updateProject(req, res));
router.delete('/:id', (req, res) => projectController.deleteProject(req, res));

export default router;
