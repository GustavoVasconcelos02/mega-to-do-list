import prisma from '../utils/prisma_client';
import { CreateTaskDTO, Tasks } from '../models/task_model';
import { AllTasksError } from '../errors/AllTasksError';
import { NotFoundError } from '../errors/NotFoundError';
import { DeleteTaskError } from '../errors/DeleteTaskError';
import { NoDescriptionError } from '../errors/NoDescriptionError';
import { NoTitleError } from '../errors/NoTitleError';
import { UpdateTaskError } from '../errors/UpdateTaskError';
import { CreateTaskError } from '../errors/CreateTaskError';

export const taskService = {
  //validacao de dados e tratamento de errors da criacao de tarefas
  async createTask(taskData: CreateTaskDTO): Promise<Tasks> {
    try {
      if (!taskData.title) throw new NoTitleError();
      if (!taskData.description) throw new NoDescriptionError();

      const created = await prisma.tasks.create({ data: taskData });
      return created;
    } catch (error) {
      if (error instanceof NoTitleError || error instanceof NoDescriptionError) {
        throw error;
      }
      throw new CreateTaskError('Erro ao criar tarefa. Verifique os dados enviados e tente novamente.');
    }
  },
  //retorna as tarefas armazenadas no banco de dados e trata erros relacionados
  async getAllTasks(page: number = 1, limit: number = 10, sortBy: string = 'createdAt', sortOrder: 'asc' | 'desc' = 'asc'): Promise<Tasks[]> {
    try {
      const tasks = await prisma.tasks.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      });
      return tasks;
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      throw new Error('Erro ao buscar todas as tarefas.');
    }
  },
  //retorna a tarefa armazenada no banco de dados de acordo com o id procurado e trata os erros relacionados 
  async getTaskById(id: string): Promise<Tasks | null> {
    try {
      const task = await prisma.tasks.findUnique({ where: { id } });
      if (!task) {
        throw new NotFoundError(`Tarefa com ID ${id} não encontrada`);
      }
      return task;
    } catch (error) {
      console.error(`Erro ao buscar tarefa com ID ${id}:`, error);
      throw new AllTasksError(`Erro ao buscar tarefa com ID ${id}`);
    }
  },
  //valida os dados, atualiza uma tarefa ja existente no banco de dados e trata os erros relacionados
  async updateTask(id: string, taskData: Partial<CreateTaskDTO>): Promise<Tasks> {
    try {
      // Permite updates parciais, mas evita atualizações vazias
      if (!taskData.title && !taskData.description) {
        throw new UpdateTaskError('Forneça ao menos um campo para atualizar.');
      }

      const updatedTask = await prisma.tasks.update({
        where: { id },
        data: taskData
      });

      return updatedTask;
    } catch (error) {
      if (error instanceof NoTitleError || error instanceof NoDescriptionError || error instanceof UpdateTaskError) {
        throw error;
      }
      console.error(`Erro ao atualizar tarefa com ID ${id}:`, error);
      throw new UpdateTaskError(`Erro ao atualizar tarefa com ID ${id}`);
    }
  },
  //deleta uma tarefa existente no banco de dados e trata os erros relacionados
  async deleteTask(id: string): Promise<Tasks> {
    try {
      const deletedTask = await prisma.tasks.delete({ where: { id } });
      return deletedTask;
    } catch (error) {
      console.error(`Erro ao deletar tarefa com ID ${id}:`, error);
      throw new DeleteTaskError(`Erro ao deletar tarefa com ID ${id}`);
    }
  }
};
