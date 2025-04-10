import { User } from "@models/user.interface";

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  searchTerm: "",
};
