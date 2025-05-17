import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError{
    constructor(message = "Sua tarefa não pode ser encontrada.") {
        super(message, 404);
    }
} 