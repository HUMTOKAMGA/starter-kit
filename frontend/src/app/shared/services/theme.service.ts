import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Theme {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: "aura" | "material" | "lara" | "nora";
}

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<string>("lara-light-blue");

  constructor() {
    // Récupérer le thème sauvegardé ou utiliser le thème par défaut
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.currentTheme.next(savedTheme);
    }
  }

  getCurrentTheme() {
    return this.currentTheme.asObservable();
  }

  setTheme(theme: string) {
    this.currentTheme.next(theme);
    localStorage.setItem("theme", theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: string) {
    const themeLink = document.getElementById("theme-link") as HTMLLinkElement;
    if (!themeLink) {
      const link = document.createElement("link");
      link.id = "theme-link";
      link.rel = "stylesheet";
      link.href = `https://unpkg.com/primeng@latest/resources/themes/${theme}/theme.css`;
      document.head.appendChild(link);
    } else {
      themeLink.href = `https://unpkg.com/primeng@latest/resources/themes/${theme}/theme.css`;
    }
  }
}
