import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/UserController';

const router = Router();

// User routes
router.get('/', getAllUsers);      // GET /api/users
router.get('/:id', getUserById);   // GET /api/users/:id

export default router;
