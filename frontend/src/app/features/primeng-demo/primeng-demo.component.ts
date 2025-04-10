import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-primeng-demo",
  standalone: true,
  imports: [ButtonModule],
  providers: [MessageService],
  templateUrl: "./primeng-demo.component.html",
  styleUrl: "./primeng-demo.component.scss",
})
export class PrimeNGDemoComponent {
  username = "";
  cities = [
    { name: "New York", code: "NY" },
    { name: "London", code: "LDN" },
    { name: "Paris", code: "PRS" },
    { name: "Tokyo", code: "TKY" },
  ];
  selectedCity: any;
  date: Date | null = null;
  checked = false;
  radioValue = "Option 1";
  sliderValue = 50;
  progressValue = 75;
  products = [
    { name: "Laptop", price: 1200, category: "Electronics", rating: 4 },
    { name: "Smartphone", price: 800, category: "Electronics", rating: 5 },
    { name: "Headphones", price: 100, category: "Accessories", rating: 3 },
    { name: "Monitor", price: 300, category: "Electronics", rating: 4 },
  ];

  constructor(private messageService: MessageService) {}

  showToast() {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
    });
  }
}
