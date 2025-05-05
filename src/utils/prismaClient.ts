// Este arquivo centraliza a criação e exportação do Prisma Client.
// Ele permite que toda a aplicação utilize a mesma instância do Prisma para acessar o banco de dados.

import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export default prisma;
