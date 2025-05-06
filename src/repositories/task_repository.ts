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

export async function getAllTasks(): Promise<Tasks[]>{
  try{
    const tasks = await prisma.tasks.findMany();
    return tasks;

  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);

    throw new Error("Erro ao buscar tarefas. Tente novamente mais tarde.")
  }
}

export async function getTaskById (id: number): Promise<Tasks | null> {
    try {
      const task = await prisma.tasks.findUnique({
        where: { id },
      });
    return task;

    } catch (error){
      console.error("Erro ao buscar tarefa por ID:", error);

      throw new Error ("Erro ao buscar tarefa. Verifique o ID informado.")
    }
}

export async function updateTask(id: number, data: Partial<CreateTaskDTO>): Promise<Tasks>{
  try {
    const updated = await prisma.tasks.update({
      where: { id },
      data,
    });
    return updated

  } catch (error){
    console.error("Erro ao atualizar tarefa:", error)

    throw new Error ("Erro ao atualizar tarefa. Verifique os dados informados")
  }
}

export async function deleteTask(id:number): Promise<Tasks> {
  try {
    const deleted = await prisma.tasks.delete({
      where: { id },
    });
    return deleted

  } catch (error){
    console.error ("Erro ao deletar tarefa:", error)

    throw new Error ("Erro ao deletar tarefa. Verifique o ID informado.")
  }
}


TODO: "Criar as funções restantes do CRUD e fazer tratamento para lidar com erros"