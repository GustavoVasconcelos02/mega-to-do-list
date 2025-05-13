//lida com o banco de dados

import prisma from '../utils/prisma_client';
import { CreateTaskDTO, Tasks } from '../models/task_model';

export const taskRepository = {
  create: async (taskData: CreateTaskDTO): Promise<Tasks> => {
    return prisma.tasks.create({ data: taskData });
  },

  findAll: async (): Promise<Tasks[]> => {
    return prisma.tasks.findMany();
  },

  findById: async (id: string): Promise<Tasks | null> => {
    return prisma.tasks.findUnique({ where: { id } });
  },

  update: async (id: string, data: Partial<CreateTaskDTO>): Promise<Tasks> => {
    return prisma.tasks.update({ where: { id }, data });
  },

  delete: async (id: string): Promise<Tasks> => {
    return prisma.tasks.delete({ where: { id } });
  },
};
