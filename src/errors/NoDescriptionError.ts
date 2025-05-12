import { CustomError } from "./CustomError";

export class NoDesriptionError extends CustomError{
    constructor(message = "Sua tarefa precisa ter uma descrição!") {
        super(message, 400);
    }
} 