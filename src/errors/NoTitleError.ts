import { CustomError } from './CustomError';

export class NoTitleError extends CustomError {
  constructor(message = "Sua tarefa necessita ter um titulo.") {
    super(message, 400);
  }
}