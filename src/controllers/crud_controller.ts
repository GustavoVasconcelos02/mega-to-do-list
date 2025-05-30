import { Response } from 'express';
import { taskService } from '../services/crud_services';
import { validateSchema } from '../utils/validate_schema';
import { createTaskSchema, updateTaskSchema } from '../schemas/task_schema';
import { AuthenticatedRequest } from '../middlewares/auth_middleware';

export const todoController = {
  // Criação de uma nova tarefa
  async createTask(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: 'Usuário não autenticado.' });
    return;
  }

  const dataWithUserId = { ...req.body, user_id: userId };

  const taskData = validateSchema(createTaskSchema, dataWithUserId, res);
  if (!taskData) return;

  try {
    const newTask = await taskService.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro desconhecido ao criar tarefa.' });
    }
    }
  },

  // Busca uma tarefa pelo ID (somente do usuário autenticado)
  async getTaskById(req: AuthenticatedRequest, res: Response): Promise<void> {
    const taskId = req.params.id;

    if (!taskId) {
      res.status(400).json({ error: 'ID da tarefa é obrigatório.' });
      return;
    }

    try {
      const task = await taskService.getTaskById(taskId, req.userId!);
      res.status(200).json(task);
    } catch (error: any) {
      res.status(404).json({ error: error.message || 'Tarefa não encontrada.' });
    }
  },

  // Lista todas as tarefas do usuário autenticado
  async getAllTasks(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const tasks = await taskService.getAllTasks(req.userId!, page, limit);
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Erro desconhecido ao listar tarefas.' });
    }
  },

  // Aplica filtros e ordenações nas tarefas do usuário autenticado
  async filterTasks(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const searchTitle = (req.query.searchTitle as string) || '';
      const filterBy = (req.query.filterBy as string) || 'createdAt';
      const filterOrder = (req.query.filterOrder as string) === 'desc' ? 'desc' : 'asc';

      const tasks = await taskService.filterTasks(
        req.userId!,
        searchTitle,
        filterBy,
        filterOrder,
        page,
        limit
      );

      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Erro desconhecido ao filtrar tarefas.' });
    }
  },

  // Atualiza uma tarefa do usuário autenticado
  async updateTask(req: AuthenticatedRequest, res: Response): Promise<void> {
    const taskId = req.params.id;
    const taskData = validateSchema(updateTaskSchema, req.body, res);
    if (!taskData) return;

    try {
      const updatedTask = await taskService.updateTask(taskId, taskData, req.userId!);
      res.status(200).json(updatedTask);
    } catch (error: any) {
      res.status(404).json({ error: error.message || 'Erro ao atualizar tarefa.' });
    }
  },

  // Deleta uma tarefa do usuário autenticado
  async deleteTask(req: AuthenticatedRequest, res: Response): Promise<void> {
    const taskId = req.params.id;
    if (!taskId) {
      res.status(400).json({ error: 'ID da tarefa é obrigatório.' });
      return;
    }

    try {
      await taskService.deleteTask(taskId, req.userId!);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message || 'Erro ao deletar tarefa.' });
    }
  },

 async deleteAllCompletedTasks(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: 'Usuário não autenticado.' });
    return;
  }

  try {
    const deletedCount = await taskService.deleteAllCompletedTasksByUser(userId);
    res.status(200).json({ message: `${deletedCount} tarefas completas foram deletadas.` });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao deletar tarefas completas.' });
  }
}

};