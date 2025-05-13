//lida com req e res http

import { Request, Response } from 'express';
import { taskService } from '../services/todo.services';
import { CreateTaskDTO } from '../models/task_model';

export const todoController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const taskData: CreateTaskDTO = req.body;
      const newTask = await taskService.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.params.id;
      const task = await taskService.getTaskById(taskId);
      res.status(200).json(task);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

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

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.params.id;
      const deletedTask = await taskService.deleteTask(taskId);
      res.status(200).json(deletedTask);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },
};
