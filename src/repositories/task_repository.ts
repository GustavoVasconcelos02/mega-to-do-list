import prisma from '../utils/prisma_client';
import { CreateTaskDTO, Tasks } from '../models/task_model';
import { taskStatus } from '../generated/prisma';


export const taskRepository = {
  // Cria uma nova tarefa no banco de dados
  async createTask(taskData: CreateTaskDTO): Promise<Tasks> {
    try {
      return await prisma.tasks.create({ 
        data: {
          ... taskData, 
          status: taskData.status || taskStatus.TODO,
     },
     });
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      throw new Error("Erro ao criar tarefa no banco de dados.");
    }
  },

  // Busca uma tarefa pelo ID
  async getTaskById(id: string): Promise<Tasks | null> {
    try {
      return await prisma.tasks.findUnique({ where: { id } });
    } catch (error) {
      console.error(`Erro ao buscar tarefa com ID ${id}:`, error);
      throw new Error("Erro ao buscar tarefa no banco de dados.");
    }
  },

  // Retorna todas as tarefas com paginação e ordenação padrão
  async getAllTask(userId: string, page = 1, limit = 10): Promise<Tasks[]> {
  const skip = (page - 1) * limit;
  try {
    return await prisma.tasks.findMany({
      where: { user_id: userId },
      skip,
      take: limit,
      orderBy: [
        { completed: 'asc' },
        { priority: 'desc' },
        {  start_date: 'asc'  },
      ],
    });
  } catch (error) {
    console.error("Erro ao buscar todas as tarefas:", error);
    throw new Error("Erro ao buscar tarefas no banco de dados.");
    }
  },

  // Retorna as tarefas com base nos filtros selecionados
  async filterTask(
    userId: string,
    searchTitle?: string,
    filterBy?: string,
    filterOrder: 'asc' | 'desc' = 'asc',
    page = 1,
    limit = 10
  ): Promise<Tasks[]> {
    const skip = (page - 1) * limit;
    const whereClause = {
      user_id: userId,
      ...(searchTitle && {
        title: {
          contains: searchTitle,
          mode: 'insensitive' as const,
        }
      })
    };

    const orderByClause = filterBy ? [{ [filterBy]: filterOrder }] : [];

    try {
      return await prisma.tasks.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: orderByClause,
      });
    } catch (error) {
      console.error("Erro ao filtrar tarefas:", error);
      throw new Error("Erro ao aplicar filtros nas tarefas.");
    }
  },

  // Atualiza os dados de uma tarefa existente
  async updateTask(id: string, taskData: Partial<CreateTaskDTO>): Promise<Tasks> {
    try {
      return await prisma.tasks.update({
        where: { id },
        data:{ 
          ...taskData,
        status: taskData.status || undefined,
      },
      });
    } catch (error) {
      console.error(`Erro ao atualizar tarefa com ID ${id}:`, error);
      throw new Error("Erro ao atualizar tarefa no banco de dados.");
    }
  },

  // Deleta uma tarefa existente pelo ID
  async deleteTask(id: string): Promise<Tasks> {
    try {
      return await prisma.tasks.delete({ where: { id } });
    } catch (error) {
      console.error(`Erro ao deletar tarefa com ID ${id}:`, error);
      throw new Error("Erro ao deletar tarefa no banco de dados.");
    }
  },
  // Deleta todas as tarefas marcadas como concluídas
 async deleteAllCompletedTasksByUser(userId: string): Promise<number> {
    try {
      const result = await prisma.tasks.deleteMany({
        where: {
          user_id: userId,
          completed: true,
        },
      });
      return result.count;
    } catch (error) {
    console.error(`Erro ao deletar tarefas completas do usuário ${userId}:`, error);
    throw new Error("Erro ao deletar tarefas completas no banco de dados.");
    }
  },
};