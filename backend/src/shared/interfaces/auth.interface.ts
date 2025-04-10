export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
}

export interface AuthResponse {
  user: AuthUserDto;
  token: string;
}
