// src/schemas/task_schema.ts
import { z } from 'zod';

// Schema para validação de criação de tarefa

export const createTaskSchema = z
  .object({
    title: z.string().min(3, { message: 'Título deve ter pelo menos 3 caracteres' }),
    description: z.string().min(10, { message: 'Descrição deve ter pelo menos 10 caracteres' }).optional(),
    scheduled_for: z.coerce.date().optional(),
    priority: z.number().min(1).max(3).optional(),
    completed: z.boolean().optional(),
    user_id: z.string().uuid({ message: 'ID de usuário inválido' }),
    start_date: z.coerce.date({ required_error: 'Data de início é obrigatória' }),
    end_date: z.coerce.date({ required_error: 'Data de término é obrigatória' }),
  })

// Schema para atualização de tarefa (todos os campos opcionais)
export const updateTaskSchema = createTaskSchema.partial();