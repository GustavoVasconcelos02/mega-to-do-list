// Molde de dados que a função createUser vai receber
export interface UserDTO {
    name: string;
    email: string;
    password: string;
}

// Representa como um usuário criado é retornado pelo banco
export interface User {
    id: string;
    name: string | null;
    email: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }