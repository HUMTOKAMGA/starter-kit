export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: "user" | "admin";
  isActive?: boolean;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: "user" | "admin";
  isActive?: boolean;
}

export interface UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: UserResponseDto[];
}

export interface UserResponse {
  user: UserResponseDto;
}

export interface DeleteUserResponse {
  message: string;
}
