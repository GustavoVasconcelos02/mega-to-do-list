import { CustomError } from "./CustomError";

export class UpdateTaskError extends CustomError{
    constructor(message = "Sua tarefa não pode ser atualizada.") {
        super(message, 500);
    }
} 