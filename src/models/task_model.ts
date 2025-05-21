// Molde de dados que a função createTask precisa receber 
export interface CreateTaskDTO {
    title: string;
    description?: string;
    scheduled_for?: Date;
    priority?: number;
    completed?: boolean;
    user_id: string;
  }

// Representa como uma terefa completa vem do banco de dados
export interface Tasks {
    id: string;
    title: string;
    description?: string | null;
    scheduled_for?: Date | null;
    priority?: number | null;
    completed: boolean | null;
    user_id: string;
    created_at: Date | null;
    updated_at: Date | null;
  }

 
