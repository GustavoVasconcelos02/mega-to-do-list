import { CustomError } from "./CustomError";

export class NoTittleError extends CustomError{
    constructor(message = "Sua tarefa precisa ter título!") {
        super(message, 400);
    }
} 