export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role: Role;
}
