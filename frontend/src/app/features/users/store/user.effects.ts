import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { User } from "@models/user.interface";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "@store/reducers";
import { of } from "rxjs";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";
import * as UserActions from "./user.actions";
import * as UserSelectors from "./user.selectors";

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.http.get<{ users: User[] }>(`${environment.apiUrl}/users`).pipe(
          map((response) =>
            UserActions.loadUsersSuccess({ users: response.users })
          ),
          catchError((error) =>
            of(UserActions.loadUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(({ user }) =>
        this.http.post<User>(`${environment.apiUrl}/users`, user).pipe(
          mergeMap((createdUser) => [
            UserActions.createUserSuccess({ user: createdUser }),
            UserActions.loadUsers(),
          ]),
          catchError((error) =>
            of(UserActions.createUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ user }) =>
        this.http
          .put<User>(`${environment.apiUrl}/users/${user.id}`, user)
          .pipe(
            map((updatedUser) =>
              UserActions.updateUserSuccess({ user: updatedUser })
            ),
            catchError((error) =>
              of(UserActions.updateUserFailure({ error: error.message }))
            )
          )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({ userId }) =>
        this.http.delete(`${environment.apiUrl}/users/${userId}`).pipe(
          map(() => UserActions.deleteUserSuccess({ userId })),
          catchError((error) =>
            of(UserActions.deleteUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  searchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.searchUsers),
      withLatestFrom(this.store.select(UserSelectors.selectAllUsers)),
      map(([{ searchTerm }, users]) => {
        const filteredUsers = users.filter(
          (user: User) =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return UserActions.loadUsersSuccess({ users: filteredUsers });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
}
