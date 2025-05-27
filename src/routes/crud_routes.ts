import express from 'express';
import { todoController } from '../controllers/crud_controller';
import { authMiddleware } from '../middlewares/auth_middleware';

const router = express.Router();

router.post('/tasks', authMiddleware, todoController.createTask);
router.get('/tasks/:id', authMiddleware, todoController.getTaskById);
router.get('/tasks', authMiddleware, todoController.getAllTasks);
router.put('/tasks/:id', authMiddleware, todoController.updateTask);
router.delete('/tasks/:id', authMiddleware, todoController.deleteTask);
router.delete('/tasks/bulk/completed', authMiddleware, todoController.deleteAllCompletedTasks);


export default router;