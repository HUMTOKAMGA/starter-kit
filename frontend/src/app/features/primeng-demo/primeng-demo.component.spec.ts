import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/angular";
import { MessageService } from "primeng/api";
import { PrimeNGDemoComponent } from "./primeng-demo.component";

describe("PrimeNGDemoComponent", () => {
  const mockMessageService = {
    add: jest.fn(),
  };

  beforeEach(async () => {
    await render(PrimeNGDemoComponent, {
      imports: [NoopAnimationsModule],
      providers: [{ provide: MessageService, useValue: mockMessageService }],
    });
  });

  it("should create", () => {
    const component = screen.getByTestId("primeng-demo");
    expect(component).toBeTruthy();
  });

  it("should initialize with default values", async () => {
    const component = await render(PrimeNGDemoComponent, {
      imports: [NoopAnimationsModule],
      providers: [{ provide: MessageService, useValue: mockMessageService }],
    });

    expect(component.fixture.componentInstance.username).toBe("");
    expect(component.fixture.componentInstance.cities.length).toBe(4);
    expect(component.fixture.componentInstance.checked).toBeFalsy();
    expect(component.fixture.componentInstance.sliderValue).toBe(50);
    expect(component.fixture.componentInstance.progressValue).toBe(75);
    expect(component.fixture.componentInstance.products.length).toBe(4);
  });

  it("should show toast message when showToast is called", async () => {
    const component = await render(PrimeNGDemoComponent, {
      imports: [NoopAnimationsModule],
      providers: [{ provide: MessageService, useValue: mockMessageService }],
    });

    component.fixture.componentInstance.showToast();

    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
    });
  });
});
