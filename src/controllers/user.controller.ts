import { Request, Response } from 'express';
import { createUserDAO } from '../DAO/user.dao';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await createUserDAO(name, email, password);
    res.status(201).json(newUser);
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    res.status(400).json({ error: 'Erro ao criar usuário. Verifique os dados e tente novamente.' });
  }
}