//lida com req e res http

import { Request, Response } from 'express';
import { taskService } from '../services/todo.services';
import { CreateTaskDTO } from '../models/task_model';

export const todoController = {

  // validacao de dados e lida com response e request http da criacao de tarefas
  async create(req: Request, res: Response): Promise<void> {
    try {
      const taskData: CreateTaskDTO = req.body;
      const newTask = await taskService.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

    // validacao de dados e lida com response e request http da procura de tarefas por id
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.params.id;
      const task = await taskService.getTaskById(taskId);
      res.status(200).json(task);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

    // validacao de dados e lida com response e request http da atualizacao de tarefas
  async update(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.params.id;
      const taskData: Partial<CreateTaskDTO> = req.body;
      const updatedTask = await taskService.updateTask(taskId, taskData);
      res.status(200).json(updatedTask);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

    // validacao de dados e lida com response e request http da exclusao de tarefas 
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.params.id;
      const deletedTask = await taskService.deleteTask(taskId);
      res.status(200).json(deletedTask);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

    // lida com response e request http da listagem de tarefas 
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },
};
