import { CreateTaskDTO, Tasks } from '../models/task_model';
import { taskRepository } from '../repositories/task_repository';
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

      return await taskRepository.createTask(taskData);
    } catch (error) {
      if (error instanceof NoTitleError || error instanceof NoDescriptionError) throw error;
      throw new CreateTaskError('Erro ao criar tarefa. Verifique os dados enviados e tente novamente.');
    }
  },

  //retorna a tarefa armazenada no banco de dados de acordo com o id procurado e trata os erros relacionados 
  async getTaskById(id: string, userId: string): Promise<Tasks> {
    try {
      const task = await taskRepository.getTaskById(id);
      if (!task || task.user_id !== userId) {
        throw new NotFoundError(`Tarefa com ID ${id} não encontrada`);
      }
      return task;
    } catch (error) {
      throw new AllTasksError(`Erro ao buscar tarefa com ID ${id}`);
    }
  },

  //retorna as tarefas armazenadas no banco de dados e trata erros relacionados
  async getAllTasks(userId: string, page = 1, limit = 10): Promise<Tasks[]> {
    try {
      return await taskRepository.getAllTask(userId, page, limit);
    } catch (error) {
      throw new AllTasksError("Erro ao buscar tarefas.");
    }
  },

  async filterTasks(
    userId: string,
    searchTitle?: string,
    filterBy?: string,
    filterOrder: 'asc' | 'desc' = 'asc',
    page = 1,
    limit = 10
  ): Promise<Tasks[]> {
    return await taskRepository.filterTask(userId, searchTitle, filterBy, filterOrder, page, limit);
  },

  //valida os dados, atualiza uma tarefa ja existente no banco de dados e trata os erros relacionados
  async updateTask(id: string, taskData: Partial<CreateTaskDTO>, userId: string): Promise<Tasks> {
    try {
      const task = await taskRepository.getTaskById(id);
      if (!task || task.user_id !== userId) {
        throw new NotFoundError(`Tarefa com ID ${id} não encontrada ou não pertence a você.`);
      }

      if (!taskData.title && !taskData.description) {
        throw new UpdateTaskError('Forneça ao menos um campo para atualizar.');
      }

      return await taskRepository.updateTask(id, taskData);
    } catch (error) {
      throw new UpdateTaskError(`Erro ao atualizar tarefa com ID ${id}`);
    }
  },
  
  //deleta uma tarefa existente no banco de dados e trata os erros relacionados
  async deleteTask(id: string, userId: string): Promise<Tasks> {
    try {
      const task = await taskRepository.getTaskById(id);
      if (!task || task.user_id !== userId) {
        throw new NotFoundError(`Tarefa com ID ${id} não encontrada ou não pertence a você.`);
      }

      return await taskRepository.deleteTask(id);
    } catch (error) {
      throw new DeleteTaskError(`Erro ao deletar tarefa com ID ${id}`);
    }
  }
};