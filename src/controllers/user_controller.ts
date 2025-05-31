import { Request, Response } from 'express';
import { createUserDAO, updateUserDAO, deleteUserDAO } from '../repositories/user_repository';
import { generateUserToken } from '../utils/generate_token';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, static_num  } = req.body;

  try {
    const newUser = await createUserDAO(name, email, password, static_num );
    const token = generateUserToken(newUser);
    res.status(201).json(newUser);
    res.status(201).json({ token });
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    res.status(400).json({ error: 'Erro ao criar usuário. Verifique os dados e tente novamente.' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, static_num  } = req.body;

  try {
    const updatedUser = await updateUserDAO(id, { name, email, password,static_num  });
    const token = generateUserToken(updatedUser);
    res.status(200).json(updatedUser);
    res.status(200).json({ token });
  } catch (error: any) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(400).json({ error: 'Erro ao atualizar usuário. Verifique os dados e tente novamente.' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteUserDAO(id);
    res.status(204).send();
  } catch (error: any) {
    console.error('Erro ao deletar usuário:', error);
    res.status(400).json({ error: 'Erro ao deletar usuário.' });
  }
};