// lida com o banco de dados

import prisma from '../utils/prisma_client';
import { CreateTaskDTO, Tasks } from '../models/task_model';

export const taskRepository = {
  // inserir tarefa nova no banco de dados
  create: async (taskData: CreateTaskDTO): Promise<Tasks> => {
    try {
      return await prisma.tasks.create({ data: taskData });
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      throw new Error("Erro ao criar tarefa. Verifique os dados e tente novamente.");
    }
  },

  // recupera todas as tarefas armazenadas no banco de dados
  findAll: async (): Promise<Tasks[]> => {
    try {
      return await prisma.tasks.findMany();
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      throw new Error("Erro ao buscar tarefas. Tente novamente mais tarde.");
    }
  },

  // recupera uma tarefa armazenada no banco de dados pelo seu id
  findById: async (id: string): Promise<Tasks | null> => {
    try {
      return await prisma.tasks.findUnique({ where: { id } });
    } catch (error) {
      console.error("Erro ao buscar tarefa por ID:", error);
      throw new Error("Erro ao buscar tarefa. Verifique o ID informado.");
    }
  },

  // atualiza uma tarefa já existente no banco de dados
  update: async (id: string, data: Partial<CreateTaskDTO>): Promise<Tasks> => {
    try {
      return await prisma.tasks.update({ where: { id }, data });
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      throw new Error("Erro ao atualizar tarefa. Verifique os dados informados.");
    }
  },

  // deleta uma tarefa existente no banco de dados
  delete: async (id: string): Promise<Tasks> => {
    try {
      return await prisma.tasks.delete({ where: { id } });
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      throw new Error("Erro ao deletar tarefa. Verifique o ID informado.");
    }
  },
};
