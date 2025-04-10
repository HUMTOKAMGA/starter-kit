import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { routes } from "./app.routes";
import { UserEffects } from "./features/users/store/user.effects";
import { reducers } from "./store/reducers";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(reducers),
    provideEffects([UserEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
