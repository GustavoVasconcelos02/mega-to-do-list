
import { CustomError } from './CustomError';

export class CreateTaskError extends CustomError {
  constructor(message = "Erro ao criar tarefa, tente novamente.") {
    super(message, 500);
  }
}