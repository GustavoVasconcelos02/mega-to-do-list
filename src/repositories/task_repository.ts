import prisma from '../utils/prisma_client';
import { CreateTaskDTO, Tasks } from '../models/task_model';

export async function createTask(taskData: CreateTaskDTO): Promise<Tasks> {
  try{  
  const created = await prisma.tasks.create({ data: taskData });
  return created;

  } catch (error) {
    console.error("Erro ao criar tarefa:", error);

    throw new Error("Erro ao criar tarefa, verifique todos os campos obrigatórios e tente novamente") 
  }
}

TODO: "Criar as funções restantes do CRUD e fazer tratamento para lidar com erros"