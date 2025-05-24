import prisma from '../utils/prisma_client';
import bcrypt from 'bcryptjs';

export const createUserDAO = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Criptografa a senha
  return await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });
};
