import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CreateUserDto } from "@models/user.interface";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";

@Component({
  selector: "app-user-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    PasswordModule,
  ],
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent {
  @Output() submit = new EventEmitter<CreateUserDto>();
  @Output() cancel = new EventEmitter<void>();

  userForm: FormGroup = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    role: ["user", [Validators.required]],
    isActive: [true],
  });

  isLoading = false;
  serverErrors: Record<string, string[]> = {};
  roles = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      role: ["user", [Validators.required]],
      isActive: [true],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      this.serverErrors = {};
      const formValue = this.userForm.value;

      // Create the DTO with the correct structure
      const createUserDto: CreateUserDto = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        password: formValue.password,
        role: formValue.role,
        isActive: formValue.isActive,
      };

      this.submit.emit(createUserDto);
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.userForm.controls).forEach((key) => {
        const control = this.userForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.userForm.reset();
    this.serverErrors = {};
    this.cancel.emit();
  }

  setServerErrors(errors: Record<string, string[]>) {
    this.serverErrors = errors;
    this.isLoading = false;
  }

  // Helper method to get error message for a field
  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (!field) return "";

    // Check for server errors first
    if (this.serverErrors[fieldName]?.length) {
      return this.serverErrors[fieldName][0];
    }

    // Then check for client-side validation errors
    if (field.hasError("required")) {
      return `${fieldName} is required`;
    }

    if (field.hasError("email")) {
      return "Please enter a valid email address";
    }

    if (field.hasError("minlength")) {
      return `${fieldName} must be at least ${field.errors?.["minlength"].requiredLength} characters`;
    }

    return "";
  }
}
