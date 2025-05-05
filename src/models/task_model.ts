// Esta interface representa o modelo de dados de uma tarefa dentro da lógica da aplicação.
// É usada para garantir consistência ao manipular dados de tarefas,
// independentemente da forma como são persistidos no banco.

export interface Tasks {
    id: string;
    title: string;
    description: string | null;
    date: Date | null;
    priority: string | null;
    completed: boolean | null;
    user_id: string;
    created_at: Date | null;
    updated_at: Date | null;
  }