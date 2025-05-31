// Molde de dados que a função createUser vai receber
export interface UserDTO {
    name: string;
    email: string;
    password: string;
    static_num?: number;
}

// Representa como um usuário criado é retornado pelo banco
export interface User {
    id: string;
    name: string | null;
    email: string | null;
    static_num?: number;
    createdAt: Date | null;
    updatedAt: Date | null;
  }

// Usando em generate_token
  export interface UserPayload {
  id: string | null; 
  name: string | null;
  email: string | null;
  static_num?: number | null;
}