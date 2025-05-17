// src/routes/user.routes.ts
import { Router } from 'express';
import { createUser } from '../controllers/user_controller';

const router = Router();

router.post('/users', createUser);

export default router;
