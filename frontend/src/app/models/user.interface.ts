export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
  isActive: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: "admin" | "user";
  isActive?: boolean;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  id: string;
}
