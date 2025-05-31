import { generateUserToken } from '../utils/generate_token';
import { Request, Response } from 'express';
import prisma from '../utils/prisma_client';
import bcrypt from 'bcryptjs';

export const loginUser: (req: Request, res: Response) => Promise<void> = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado.' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Senha inválida.' });
      return;
    }

    const token = generateUserToken(user);
    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};
