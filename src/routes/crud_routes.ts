// src/routes/todo.routes.ts

import { Router } from 'express';
import { todoController } from '../controllers/crud_controller';

const router = Router();

router.post('/tasks', todoController.createTask);
router.get('/tasks/:id', todoController.getTaskById);
router.put('/tasks/:id', todoController.updateTask);
router.delete('/tasks/:id', todoController.deleteTask);
router.get('/tasks', todoController.getAllTask);

export default router;
