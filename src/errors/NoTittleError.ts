export class NoTittleError extends Error{
    constructor(message = "Sua tarefa precisa ter título!") {
        super(message);
    }
} 