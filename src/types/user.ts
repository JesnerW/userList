export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface CreateUserData {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UserFormData extends CreateUserData {}

export interface UserFormErrors {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
}