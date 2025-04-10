import { Routes } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "users",
    loadComponent: () =>
      import("./features/users/user-list/user-list.component").then(
        (m) => m.UserListComponent
      ),
  },
  {
    path: "users/create",
    loadComponent: () =>
      import("./features/users/create-user/create-user.component").then(
        (m) => m.CreateUserComponent
      ),
  },
  {
    path: "**",
    redirectTo: "",
  },
];
