import { provideHttpClient, withInterceptors } from "@angular/common/http";
import {
  bootstrapApplication,
  provideClientHydration,
} from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { appConfig } from "../app.config";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { authInterceptor } from "./app/core/interceptors/auth.interceptor";
import { UserEffects } from "./app/features/users/store/user.effects";
import { reducers } from "./app/store/reducers";

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideClientHydration(),
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
}).catch((err) => console.error(err));
