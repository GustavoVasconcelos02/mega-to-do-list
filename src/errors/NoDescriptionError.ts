import { CustomError } from "./CustomError";

export class NoDescriptionError extends CustomError{
    constructor(message = "Sua tarefa precisa ter uma descrição!") {
        super(message, 400);
    }
} 