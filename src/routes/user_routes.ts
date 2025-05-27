// routes/user_routes.ts
import { Router } from 'express';
import { createUser, updateUser, deleteUser} from '../controllers/user_controller';
import { loginUser } from '../controllers/login_controller';


const router = Router();

router.post('/users', createUser);        
router.post('/login', loginUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;