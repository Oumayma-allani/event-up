export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
}

export interface Local {
  id: number;
  name: string;
  address: string;
  capacity: number;
  type: string;
}

export interface SousCategorie {
  id: number;
  name: string;
}

export interface EventFull {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  sousCategorie: SousCategorie;
  local: Local;
  organisateur: User;
  
}
