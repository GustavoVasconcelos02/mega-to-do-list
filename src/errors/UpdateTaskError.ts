export class UpdateTaskError extends Error{
    constructor(message = "Sua tarefa não pode ser atualizada.") {
        super(message);
    }
} 