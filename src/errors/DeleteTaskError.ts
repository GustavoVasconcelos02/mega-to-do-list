import { CustomError } from "./CustomError";

export class DeleteTaskError extends CustomError{
    constructor(message = "Sua tarefa não pode ser deletada.") {
        super(message, 500);
    }
} 