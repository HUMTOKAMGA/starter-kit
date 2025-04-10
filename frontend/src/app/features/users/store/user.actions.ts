import { createAction, props } from "@ngrx/store";
import { CreateUserDto, User } from "@shared/interfaces/user.interface";

// Load Users
export const loadUsers = createAction("[User] Load Users");
export const loadUsersSuccess = createAction(
  "[User] Load Users Success",
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  "[User] Load Users Failure",
  props<{ error: string }>()
);

// Create User
export const createUser = createAction(
  "[User] Create User",
  props<{ user: CreateUserDto }>()
);
export const createUserSuccess = createAction(
  "[User] Create User Success",
  props<{ user: User }>()
);
export const createUserFailure = createAction(
  "[User] Create User Failure",
  props<{ error: string }>()
);

// Update User
export const updateUser = createAction(
  "[User] Update User",
  props<{ user: User }>()
);
export const updateUserSuccess = createAction(
  "[User] Update User Success",
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  "[User] Update User Failure",
  props<{ error: string }>()
);

// Delete User
export const deleteUser = createAction(
  "[User] Delete User",
  props<{ userId: string }>()
);
export const deleteUserSuccess = createAction(
  "[User] Delete User Success",
  props<{ userId: string }>()
);
export const deleteUserFailure = createAction(
  "[User] Delete User Failure",
  props<{ error: string }>()
);

// Select User
export const selectUser = createAction(
  "[User] Select User",
  props<{ user: User | null }>()
);

// Search Users
export const searchUsers = createAction(
  "[User] Search Users",
  props<{ searchTerm: string }>()
);
