import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "./store/reducers";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
      }
    `,
  ],
})
export class AppComponent {
  constructor(private store: Store<AppState>) {}
}
