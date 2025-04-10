import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { environment } from "@environments/environment";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { CreateUserComponent } from "./create-user.component";

describe("CreateUserComponent", () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ButtonModule,
        CardModule,
        InputTextModule,
        DropdownModule,
        CheckboxModule,
        ToastModule,
      ],
      providers: [FormBuilder, MessageService],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with default values", () => {
    expect(component.userForm.get("role")?.value).toBe("user");
    expect(component.userForm.get("isActive")?.value).toBe(true);
  });

  it("should validate required fields", () => {
    const form = component.userForm;
    expect(form.valid).toBeFalsy();

    form.controls["firstName"].setValue("John");
    form.controls["lastName"].setValue("Doe");
    form.controls["email"].setValue("john@example.com");
    form.controls["password"].setValue("password123");

    expect(form.valid).toBeTruthy();
  });

  it("should validate email format", () => {
    const emailControl = component.userForm.controls["email"];
    emailControl.setValue("invalid-email");
    expect(emailControl.valid).toBeFalsy();

    emailControl.setValue("valid@email.com");
    expect(emailControl.valid).toBeTruthy();
  });

  it("should validate password length", () => {
    const passwordControl = component.userForm.controls["password"];
    passwordControl.setValue("12345");
    expect(passwordControl.valid).toBeFalsy();

    passwordControl.setValue("123456");
    expect(passwordControl.valid).toBeTruthy();
  });

  it("should submit form successfully", () => {
    const formData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
      role: "user",
      isActive: true,
    };

    component.userForm.patchValue(formData);
    component.onSubmit();

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(formData);

    req.flush({ user: { ...formData, id: "1" } });
    expect(component.userForm.pristine).toBeTruthy();
  });

  it("should handle error on submit", () => {
    const formData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
      role: "user",
      isActive: true,
    };

    component.userForm.patchValue(formData);
    component.onSubmit();

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    req.error(new ErrorEvent("Network error"));

    expect(component.loading).toBeFalsy();
  });
});
