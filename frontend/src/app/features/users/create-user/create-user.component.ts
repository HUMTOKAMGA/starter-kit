import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { environment } from "@environments/environment";
import { CreateUserDto } from "@shared/interfaces/user.interface";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-create-user",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.scss"],
})
export class CreateUserComponent {
  userForm: FormGroup;
  loading = false;
  roles = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.userForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      role: ["user"],
      isActive: [true],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      const userData: CreateUserDto = this.userForm.value;

      this.http.post(`${environment.apiUrl}/users`, userData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "User created successfully",
          });
          this.userForm.reset();
        },
        error: (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.message || "Failed to create user",
          });
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }
}
