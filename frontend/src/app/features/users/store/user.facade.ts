import { Injectable } from "@angular/core";
import { User } from "@models/user.interface";
import { Store } from "@ngrx/store";
import { CreateUserDto } from "@shared/interfaces/user.interface";
import { Observable } from "rxjs";
import { AppState } from "../../../store/reducers";
import * as UserActions from "./user.actions";
import * as UserSelectors from "./user.selectors";

@Injectable({
  providedIn: "root",
})
export class UserFacade {
  users$: Observable<User[]> = this.store.select(UserSelectors.selectAllUsers);
  selectedUser$: Observable<User | null> = this.store.select(
    UserSelectors.selectSelectedUser
  );
  loading$: Observable<boolean> = this.store.select(
    UserSelectors.selectUserLoading
  );
  error$: Observable<string | null> = this.store.select(
    UserSelectors.selectUserError
  );
  filteredUsers$: Observable<User[]> = this.store.select(
    UserSelectors.selectFilteredUsers
  );

  constructor(private store: Store<AppState>) {}

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  createUser(user: CreateUserDto): void {
    this.store.dispatch(UserActions.createUser({ user }));
  }

  updateUser(user: User): void {
    this.store.dispatch(UserActions.updateUser({ user }));
  }

  deleteUser(userId: string): void {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }

  selectUser(user: User | null): void {
    this.store.dispatch(UserActions.selectUser({ user }));
  }

  searchUsers(searchTerm: string): void {
    this.store.dispatch(UserActions.searchUsers({ searchTerm }));
  }
}
