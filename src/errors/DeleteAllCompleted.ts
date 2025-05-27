export class DeleteAllTasksError extends Error {
  constructor(message = 'Erro ao deletar todas as tarefas completas.') {
    super(message);
    this.name = 'DeleteAllTasksError';
  }
}
