// Molde de dados que a função createTask precisa receber 
export interface CreateTaskDTO {
    title: string;
    description?: string;
    date?: Date;
    priority?: string;
    completed?: boolean;
    user_id: string;
  }

// Representa como uma terefa completa vem do banco de dados
export interface Tasks {
    id: string;
    title: string;
    description?: string | null;
    date?: Date | null;
    priority?: string | null;
    completed: boolean | null;
    user_id: string;
    created_at: Date | null;
    updated_at: Date | null;
  }

 
