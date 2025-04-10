import { User } from "@models/user.interface";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";

export const selectUserState = createFeatureSelector<UserState>("users");

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users || []
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUser
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectUserSearchTerm = createSelector(
  selectUserState,
  (state: UserState) => state.searchTerm
);

export const selectFilteredUsers = createSelector(
  selectAllUsers,
  selectUserSearchTerm,
  (users: User[], searchTerm: string) => {
    if (!users) return [];
    if (!searchTerm) return users;
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
);
