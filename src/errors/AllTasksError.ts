export class AllTasksError extends Error{
    constructor(message = "Erro ao buscar tarefas.") {
        super(message);
    }
} 