//controla o fluxo entra a requisição http e a logica do todo

import { Request, Response } from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../repositories/task_repository';
import { CreateTaskDTO } from '../models/task_model';

export const todoController = {
  async create(req: Request, res: Response): Promise<any> {
    try {
      const { title, description, completed, user_id } = req.body;

      if (!title || typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Título e status são obrigatórios' });
      }

      const newTask = await createTask({ title, description, completed, user_id });
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
  },

  async getById(req: Request, res: Response):Promise <any> {
    try {
      const taskId = req.params.id;
      const task = await getTaskById(taskId);

      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      res.status(200).json(task);
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
      res.status(500).json({ error: 'Erro ao buscar tarefa' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      const { title, description, completed, user_id } = req.body;

      const updatedData: Partial<CreateTaskDTO> = { title, description, completed, user_id };
      const updatedTask = await updateTask(taskId, updatedData);

      res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      const deletedTask = await deleteTask(taskId);

      res.status(200).json(deletedTask);
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const tasks = await getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
  },
};
