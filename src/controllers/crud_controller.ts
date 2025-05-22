//lida com req e res http
import { Request, Response } from 'express';
import { taskService } from '../services/crud_services';
import { z } from 'zod';


export const createTaskSchema = z.object({
  title: z.string().min(3, { message: 'Titulo deve ter pelo menos 3 caracteres'}),
  description: z.string().min(10, { message: "Descrição deve ter pelo menos 10 caracteres"}).optional(),
  date: z.date().optional(),
  priority: z.number().min(1).max(3).optional(),
  completed: z.boolean().optional(),
  user_id: z.string().uuid({ message: "ID de usuario invalido"})
});

export const todoController = {
  // validacao da criacao de tarefas
  async createTask(req: Request, res: Response): Promise<any> {
    // valida o corpo da requisição (req.body) com base no esquema definido em createTaskSchema
    const result = createTaskSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: result.error.errors,
      });
    }

    try {
      const taskData = result.data;
      const newTask = await taskService.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  //validacao da atualizacao de tarefas
  async updateTask(req: Request, res: Response): Promise<any> {
    const result = createTaskSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: result.error.errors,
      });
    }

    try {
      const taskId = req.params.id;
      const taskData = result.data;
      const updatedTask = await taskService.updateTask(taskId, taskData);
      res.status(200).json(updatedTask);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  //valida se o id do usuario existe e deleta a tarefa existente no banco de dados 
  async deleteTask(req: Request, res: Response): Promise<any> {
    const taskId = req.params.id;

    if (!taskId) {
      return res.status(400).json({ error: 'ID da tarefa é obrigatório' });
    }

    try {
      const deletedTask = await taskService.deleteTask(taskId);
      if (!deletedTask) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  //valida o id informado e procura a tarfa referente esse id no banco de dados
  async getTaskById(req: Request, res: Response): Promise<any> {
    const taskId = req.params.id;

    if (!taskId) {
      return res.status(400).json({ error: 'ID da tarefa é obrigatório' });
    }

    try {
      const task = await taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      res.status(200).json(task);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  //lista todas as tarefas criadas no banco de dados 
  async getAllTask(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};




