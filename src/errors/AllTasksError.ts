import { CustomError } from "./CustomError";    

export class AllTasksError extends CustomError{
    constructor(message = "Erro ao buscar tarefas.") {
        super(message, 500);
    }
} 