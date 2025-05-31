import jwt from 'jsonwebtoken';
import { UserPayload } from '../models/user_model';

export function generateUserToken(user: UserPayload): string {
  return jwt.sign(
    {
      name: user.name,
      userId: user.id,
      email: user.email,
      static_num: user.static_num,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );
}
