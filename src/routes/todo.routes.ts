// src/routes/todo.routes.ts

import { Router } from 'express';
import { todoController } from '../controllers/todo.controller';

const router = Router();

router.post('/tasks', todoController.create);
router.get('/tasks/:id', todoController.getById);
router.put('/tasks/:id', todoController.update);
router.delete('/tasks/:id', todoController.delete);
router.get('/tasks', todoController.getAll);

export default router;
