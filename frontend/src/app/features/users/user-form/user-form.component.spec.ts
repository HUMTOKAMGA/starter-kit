import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { UserFormComponent } from "./user-form.component";

describe("UserFormComponent", () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with empty form", () => {
    expect(component.userForm.get("firstName")?.value).toBe("");
    expect(component.userForm.get("lastName")?.value).toBe("");
    expect(component.userForm.get("email")?.value).toBe("");
    expect(component.userForm.get("password")?.value).toBe("");
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
    form.controls["role"].setValue("user");

    expect(form.valid).toBeTruthy();
  });

  it("should validate email format", () => {
    const emailControl = component.userForm.get("email");
    emailControl?.setValue("invalid-email");
    expect(emailControl?.valid).toBeFalsy();

    emailControl?.setValue("valid@email.com");
    expect(emailControl?.valid).toBeTruthy();
  });

  it("should validate password length", () => {
    const passwordControl = component.userForm.get("password");
    passwordControl?.setValue("12345");
    expect(passwordControl?.valid).toBeFalsy();

    passwordControl?.setValue("123456");
    expect(passwordControl?.valid).toBeTruthy();
  });

  it("should emit form data on valid submission", () => {
    const submitSpy = spyOn(component.submit, "emit");
    const form = component.userForm;

    form.controls["firstName"].setValue("John");
    form.controls["lastName"].setValue("Doe");
    form.controls["email"].setValue("john@example.com");
    form.controls["password"].setValue("password123");
    form.controls["role"].setValue("user");

    component.onSubmit();
    expect(submitSpy).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
      role: "user",
      isActive: true,
    });
  });

  it("should not emit on invalid submission", () => {
    const submitSpy = spyOn(component.submit, "emit");
    component.onSubmit();
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it("should emit cancel event", () => {
    const cancelSpy = spyOn(component.cancel, "emit");
    component.onCancel();
    expect(cancelSpy).toHaveBeenCalled();
  });

  it("should reset form on cancel", () => {
    const form = component.userForm;
    form.patchValue({
      firstName: "John",
      lastName: "Doe",
    });

    component.onCancel();
    expect(form.get("firstName")?.value).toBe("");
    expect(form.get("lastName")?.value).toBe("");
  });
});
