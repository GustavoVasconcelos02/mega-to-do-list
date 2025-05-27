import prisma from '../utils/prisma_client';
import bcrypt from 'bcryptjs';

//cadastra um usuario 
export const createUserDAO = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10); 
  return await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });
};

//atualiza um usuario
export async function updateUserDAO(
  id: string,
  data: { name?: string; email?: string; password?: string }
) {

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return prisma.users.update({
    where: { id },
    data,
  });
}

//exclui um usuario pelo ID
export async function deleteUserDAO(id: string) {
  return prisma.users.delete({
    where: { id },
  });
}