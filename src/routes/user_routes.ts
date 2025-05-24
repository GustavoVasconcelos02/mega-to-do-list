// routes/user_routes.ts
import { Router } from 'express';
import { createUser} from '../controllers/user_controller';
import { loginUser } from '../controllers/login_controller';


const router = Router();

router.post('/users', createUser);        
router.post('/login', loginUser);

export default router;