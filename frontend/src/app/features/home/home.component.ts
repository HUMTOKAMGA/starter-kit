import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AvatarModule } from "primeng/avatar";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";

import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";

import { Theme, ThemeService } from "../../shared/services/theme.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    ProgressBarModule,
    RadioButtonModule,
    FormsModule,
    AvatarModule,
  ],
  templateUrl: "./home.component.html",
  styles: [
    `
      .home-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        color: #fff;
        padding: 2rem;
      }

      .hero-section {
        text-align: center;
        padding: 4rem 2rem;
        max-width: 800px;
        margin: 0 auto;

        .title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #00ff87, #60efff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;

          ::ng-deep {
            .p-button {
              padding: 0.75rem 1.5rem;
              font-size: 1rem;
            }
          }
        }
      }

      .theme-section {
        padding: 4rem 2rem;
        max-width: 1200px;
        margin: 0 auto;

        h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: #fff;
        }

        .theme-categories {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          .theme-category {
            h3 {
              font-size: 1.8rem;
              color: #fff;
              margin-bottom: 1.5rem;
              text-transform: capitalize;
            }
          }
        }

        .theme-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .theme-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);

          &:hover {
            transform: translateY(-5px);
          }

          .theme-preview {
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);

            i {
              font-size: 2.5rem;
              color: #fff;
            }
          }

          .theme-info {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            h4 {
              margin: 0;
              font-size: 1.1rem;
              color: #fff;
            }

            ::ng-deep {
              .p-radiobutton {
                .p-radiobutton-box {
                  background: rgba(255, 255, 255, 0.1);
                  border-color: rgba(255, 255, 255, 0.2);

                  &.p-highlight {
                    background: #00ff87;
                    border-color: #00ff87;
                  }
                }
              }
            }
          }
        }
      }

      .features-section {
        padding: 4rem 2rem;
        max-width: 1200px;
        margin: 0 auto;

        h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: #fff;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-5px);
          }

          ::ng-deep {
            .p-card-header {
              text-align: center;
              padding: 1.5rem;
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);

              .feature-icon {
                font-size: 2.5rem;
                color: #00ff87;
                margin-bottom: 1rem;
              }

              h3 {
                margin: 0;
                font-size: 1.5rem;
                color: #fff;
              }
            }

            .p-card-content {
              padding: 1.5rem;
              color: rgba(255, 255, 255, 0.8);
              line-height: 1.6;
            }
          }
        }
      }

      .tech-stack-section {
        padding: 4rem 2rem;
        max-width: 1200px;
        margin: 0 auto;

        h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: #fff;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .tech-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-5px);
          }

          i {
            font-size: 2rem;
            color: #00ff87;
          }

          span {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1rem;
          }
        }
      }

      @media screen and (max-width: 768px) {
        .home-container {
          padding: 1rem;
        }

        .hero-section {
          padding: 2rem 1rem;

          .title {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .hero-buttons {
            flex-direction: column;
          }
        }

        .features-section,
        .tech-stack-section,
        .theme-section {
          padding: 2rem 1rem;

          h2 {
            font-size: 2rem;
          }
        }
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  themeCategories = ["aura", "material", "lara", "nora"] as const;

  themes: Theme[] = [
    // Aura Themes
    {
      id: "aura-light-green",
      name: "Aura Light Green",
      icon: "pi pi-palette",
      color: "#4CAF50",
      category: "aura",
    },
    {
      id: "aura-light-blue",
      name: "Aura Light Blue",
      icon: "pi pi-palette",
      color: "#2196F3",
      category: "aura",
    },
    {
      id: "aura-light-purple",
      name: "Aura Light Purple",
      icon: "pi pi-palette",
      color: "#9C27B0",
      category: "aura",
    },
    {
      id: "aura-dark-green",
      name: "Aura Dark Green",
      icon: "pi pi-palette",
      color: "#388E3C",
      category: "aura",
    },
    {
      id: "aura-dark-blue",
      name: "Aura Dark Blue",
      icon: "pi pi-palette",
      color: "#1976D2",
      category: "aura",
    },
    {
      id: "aura-dark-purple",
      name: "Aura Dark Purple",
      icon: "pi pi-palette",
      color: "#7B1FA2",
      category: "aura",
    },

    // Material Themes
    {
      id: "material-light-indigo",
      name: "Material Light Indigo",
      icon: "pi pi-palette",
      color: "#3F51B5",
      category: "material",
    },
    {
      id: "material-light-deeppurple",
      name: "Material Light Deep Purple",
      icon: "pi pi-palette",
      color: "#673AB7",
      category: "material",
    },
    {
      id: "material-light-pink",
      name: "Material Light Pink",
      icon: "pi pi-palette",
      color: "#E91E63",
      category: "material",
    },
    {
      id: "material-dark-indigo",
      name: "Material Dark Indigo",
      icon: "pi pi-palette",
      color: "#303F9F",
      category: "material",
    },
    {
      id: "material-dark-deeppurple",
      name: "Material Dark Deep Purple",
      icon: "pi pi-palette",
      color: "#512DA8",
      category: "material",
    },
    {
      id: "material-dark-pink",
      name: "Material Dark Pink",
      icon: "pi pi-palette",
      color: "#C2185B",
      category: "material",
    },

    // Lara Themes
    {
      id: "lara-light-blue",
      name: "Lara Light Blue",
      icon: "pi pi-palette",
      color: "#2196F3",
      category: "lara",
    },
    {
      id: "lara-light-indigo",
      name: "Lara Light Indigo",
      icon: "pi pi-palette",
      color: "#3F51B5",
      category: "lara",
    },
    {
      id: "lara-light-purple",
      name: "Lara Light Purple",
      icon: "pi pi-palette",
      color: "#9C27B0",
      category: "lara",
    },
    {
      id: "lara-light-teal",
      name: "Lara Light Teal",
      icon: "pi pi-palette",
      color: "#009688",
      category: "lara",
    },
    {
      id: "lara-dark-blue",
      name: "Lara Dark Blue",
      icon: "pi pi-palette",
      color: "#1976D2",
      category: "lara",
    },
    {
      id: "lara-dark-indigo",
      name: "Lara Dark Indigo",
      icon: "pi pi-palette",
      color: "#303F9F",
      category: "lara",
    },
    {
      id: "lara-dark-purple",
      name: "Lara Dark Purple",
      icon: "pi pi-palette",
      color: "#7B1FA2",
      category: "lara",
    },
    {
      id: "lara-dark-teal",
      name: "Lara Dark Teal",
      icon: "pi pi-palette",
      color: "#00796B",
      category: "lara",
    },

    // Nora Themes
    {
      id: "nora-light-blue",
      name: "Nora Light Blue",
      icon: "pi pi-palette",
      color: "#2196F3",
      category: "nora",
    },
    {
      id: "nora-light-green",
      name: "Nora Light Green",
      icon: "pi pi-palette",
      color: "#4CAF50",
      category: "nora",
    },
    {
      id: "nora-light-orange",
      name: "Nora Light Orange",
      icon: "pi pi-palette",
      color: "#FF9800",
      category: "nora",
    },
    {
      id: "nora-dark-blue",
      name: "Nora Dark Blue",
      icon: "pi pi-palette",
      color: "#1976D2",
      category: "nora",
    },
    {
      id: "nora-dark-green",
      name: "Nora Dark Green",
      icon: "pi pi-palette",
      color: "#388E3C",
      category: "nora",
    },
    {
      id: "nora-dark-orange",
      name: "Nora Dark Orange",
      icon: "pi pi-palette",
      color: "#F57C00",
      category: "nora",
    },
  ];

  selectedTheme: string = "lara-light-blue";

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getCurrentTheme().subscribe((theme: string) => {
      this.selectedTheme = theme;
    });
  }

  onThemeChange(themeId: string) {
    this.themeService.setTheme(themeId);
  }

  getThemesByCategory(category: string): Theme[] {
    return this.themes.filter((theme) => theme.category === category);
  }
}
