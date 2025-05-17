//lida com o banco de dados

import prisma from '../utils/prisma_client';
import { CreateTaskDTO, Tasks } from '../models/task_model';

export const taskRepository = {
  //inserir tarefa nova no banco de dados
  create: async (taskData: CreateTaskDTO): Promise<Tasks> => {
    return prisma.tasks.create({ data: taskData });
  },
  //recupera todas as tarefas armazenadas no banco de dados
  findAll: async (): Promise<Tasks[]> => {
    return prisma.tasks.findMany();
  },
  //recupera uma tarefa armazenada no banco de dados pelo seu id
  findById: async (id: string): Promise<Tasks | null> => {
    return prisma.tasks.findUnique({ where: { id } });
  },
  //atualiza uma tarefa ja existente no banco de dados
  update: async (id: string, data: Partial<CreateTaskDTO>): Promise<Tasks> => {
    return prisma.tasks.update({ where: { id }, data });
  },
  //deleta uma tarefa existente no banco de dados
  delete: async (id: string): Promise<Tasks> => {
    return prisma.tasks.delete({ where: { id } });
  },
};
