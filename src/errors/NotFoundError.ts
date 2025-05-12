export class NotFoundError extends Error{
    constructor(message = "Sua tarefa não pode ser encontrada.") {
        super(message);
    }
} 