export class NoDesriptionError extends Error{
    constructor(message = "Sua tarefa precisa ter uma descrição!") {
        super(message);
    }
} 