// Esta interface representa o modelo de dados de um usuário dentro da lógica da aplicação.
// Ela é usada para definir a estrutura esperada dos dados do usuário, 
// sem depender diretamente do Prisma ou do banco de dados.

export interface User {
    id: string;
    name: string | null;
    email: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }