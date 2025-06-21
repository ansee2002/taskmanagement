import express from 'express';
import { getTasks, createTask, deleteTask } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);

export default router;
