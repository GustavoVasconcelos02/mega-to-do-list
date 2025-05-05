import prisma from '../utils/prismaClient';
import { Tasks } from '../models/task_model';

// Função para criação de tarefas
async function createTask(taskData:Tasks): Promise<Tasks> {
    return await prisma.tasks.create({ data: taskData });
    
}

TODO: "Criar as funções restantes do CRUD e fazer tratamento para lidar com erros"