export class DeleteTaskError extends Error{
    constructor(message = "Sua tarefa não pode ser deletada.") {
        super(message);
    }
} 