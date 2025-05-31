
![image_banner](images/banner.png)

## Descrição

O **To-Do List APP** é uma API RESTful desenvolvida com **Node.js**, **Express** e **TypeScript**, voltada para o gerenciamento de tarefas. A aplicação permite o cadastro e login de usuários, além da criação, listagem, atualização e remoção de tarefas com filtros avançados, autenticação com JWT e boas práticas de segurança.

---

## Ferramentas e Tecnologias

- **[Node.js](https://nodejs.org/)** – Ambiente de execução JavaScript.
- **[Express](https://expressjs.com/)** – Framework para criação de APIs.
- **[TypeScript](https://www.typescriptlang.org/)** – Superset do JavaScript com tipagem estática.
- **[Prisma ORM](https://www.prisma.io/)** – Mapeamento objeto-relacional com PostgreSQL.
- **[PostgreSQL](https://www.postgresql.org/)** – SGBD  
- **[BcryptJS](https://github.com/dcodeIO/bcrypt.js/)** – Hash de senhas para segurança.
- **[jsonwebtoken (JWT)](https://jwt.io/)** – Autenticação baseada em tokens.
- **[Zod](https://zod.dev/)** – para validação de dados

---

## Guia de Instalação

### 1. Clone este repositório
```bash
git clone https://github.com/GustavoVasconcelos02/mega-to-do-list.git
```
### 2. Inicie um projeto Node.js
```
npm install -y
```
### 3. Instale o Express
```
npm install express
```
### 4. Instale o TypeScript e dependências de desenvolvimento
```
npm install -D typescript ts-node-dev @types/node @types/express
```
### 5. Crie o arquivo de configuração do TypeScript
```
npx tsc --init
```
### 6. Instale as demais dependências
```
npm install prisma @prisma/client bcryptjs jsonwebtoken dotenv
npm install -D @types/bcryptjs @types/jsonwebtoken
```
### 7. Configure o Prisma
```
npx prisma init
```

Atualize o arquivo .env com as credenciais do banco de dados e segredo JWT:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/megatodolist"
JWT_SECRET="sua_chave_secreta"
```
### 8. Execute as migrações do banco de dados
```
npx prisma migrate dev --name init
```
### 9. Inicie a aplicação
```
cd ./src
npm run dev
```

## Estrutura do Projeto
```
mega-to-do-list/
├── src/                         # Código-fonte da aplicação
│   ├── controllers/             # Controladores responsáveis por lidar com as requisições
│   │   ├── crud_controller.ts
│   │   ├── login_controller.ts
│   │   └── user_controller.ts
│   │
│   ├── errors/                  # Definições de erros personalizados
│   │   ├── AllTasksError.ts
│   │   ├── CreateTaskError.ts
│   │   ├── CustomError.ts
│   │   ├── DeleteAllCompleted.ts
│   │   ├── DeleteTaskError.ts
│   │   ├── NoDescriptionError.ts
│   │   ├── NotFoundError.ts
│   │   ├── NoTitleError.ts
│   │   └── UpdateTaskError.ts
│   │
│   ├── middlewares/            # Middlewares (ex: autenticação)
│   │   └── auth_middleware.ts
│   │
│   ├── models/                  # Tipos e interfaces utilizados na aplicação
│   │   ├── task_model.ts
│   │   └── user_model.ts
│   │
│   ├── repositories/           # Camada de acesso ao banco de dados (Prisma)
│   │   ├── task_repository.ts
│   │   └── user_repository.ts
│   │
│   ├── routes/                 # Definição das rotas da aplicação
│   │   ├── crud_routes.ts
│   │   └── user_routes.ts
│   │
│   ├── schemas/                # Schemas de validação com Zod
│   │   └── task_schema.ts
│   │
│   ├── services/               # Lógica de negócio da aplicação
│   │   └── crud_services.ts
│   │
│   ├── utils/                  # Utilitários auxiliares
│   │   ├── generate_token.ts
│   │   ├── prisma_client.ts
│   │   └── validate_schema.ts
│   │
│   └── server.ts              # Ponto de entrada da aplicação (servidor Express)

```

## Segurança
Senhas criptografadas com bcryptjs.

Autenticação segura com tokens JWT válidos por 1 hora.

Middleware de autenticação protege as rotas privadas.

Acesso a tarefas restrito ao dono (userId).

## Considerações
Esse projeto é uma base robusta para qualquer aplicação de tarefas multiusuário, com autenticação, segurança, validações, organização modular e pronto para evoluções futuras.

## Contato
Desenvolvido por Gustavo Vasconcelos e Bruno Hernandez

🔗 GitHub: [@GustavoVasconcelos02](https://github.com/GustavoVasconcelos02)

🔗 GitHub: [@BrunoFHernandez](https://github.com/BrunoFHernandez)

