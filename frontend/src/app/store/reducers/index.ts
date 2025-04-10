import { ActionReducerMap } from "@ngrx/store";
import { userReducer } from "../../features/users/store/user.reducer";
import { UserState } from "../../features/users/store/user.state";

export interface AppState {
  users: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: userReducer,
};
