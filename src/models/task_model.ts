import { taskStatus } from "../generated/prisma";

// Molde de dados que a função createTask precisa receber 
export interface CreateTaskDTO {
    title: string;
    description?: string;
    start_date?: Date;
    priority?: number;
    completed?: boolean;
    user_id: string;
    status?: taskStatus;
  }

// Representa como uma terefa completa vem do banco de dados
export interface Tasks {
    id: string;
    title: string;
    description?: string | null;
    status?: taskStatus;
    priority?: number | null;
    completed: boolean | null;
    start_date?: Date | null;
    end_date?: Date | null;
    user_id: string;
    created_at: Date | null;
    updated_at: Date | null;
  }

 
