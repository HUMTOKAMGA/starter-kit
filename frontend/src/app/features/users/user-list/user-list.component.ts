import { CommonModule } from "@angular/common";
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { UserFacade } from "@features/users/store/user.facade";
import { UserFormComponent } from "@features/users/user-form/user-form.component";
import { CreateUserDto, User } from "@models/user.interface";
import { ModalComponent } from "@shared/components/modal/modal.component";
import {
  ConfirmationService,
  FilterMatchMode,
  MessageService,
} from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { Subject, takeUntil } from "rxjs";

interface ValidationError {
  errors: Record<string, string[]>;
}

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ConfirmDialogModule,
    ModalComponent,
    UserFormComponent,
  ],
  providers: [MessageService, ConfirmationService, UserFacade],
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;

  private destroy$ = new Subject<void>();

  users$ = this.userFacade.users$;
  loading$ = this.userFacade.loading$;
  error$ = this.userFacade.error$;
  isCreateModalVisible = false;
  searchTerm = "";
  itemsPerPage = 10;
  FilterMatchMode = FilterMatchMode;

  constructor(
    private userFacade: UserFacade,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.setupErrorHandling();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUsers() {
    this.userFacade.loadUsers();
  }

  private setupErrorHandling() {
    this.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      if (error && !this.isCreateModalVisible) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error,
        });
      }
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  onEditUser(user: User) {
    this.router.navigate(["/users/edit", user.id]);
  }

  onDeleteUser(user: User) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.userFacade.deleteUser(user.id);
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "User deleted successfully",
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "info",
          summary: "Cancelled",
          detail: "User deletion cancelled",
        });
      },
    });
  }

  getStatusSeverity(status: string): string {
    return status.toLowerCase();
  }

  getRoleSeverity(role: string): string {
    return role.toLowerCase();
  }

  showCreateModal() {
    this.isCreateModalVisible = true;
  }

  hideCreateModal() {
    this.isCreateModalVisible = false;
    this.loadUsers();
  }

  onCreateUser(user: CreateUserDto) {
    this.userFacade.createUser(user);
    this.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      if (error) {
        if (typeof error === "object" && "errors" in error) {
          // Handle validation errors
          const validationError = error as ValidationError;
          this.userFormComponent?.setServerErrors(validationError.errors);
        } else {
          // Handle other errors
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error as string,
          });
        }
      } else {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "User created successfully",
        });
        // Attendre un court instant pour laisser le temps au backend de traiter la requête
        setTimeout(() => {
          this.hideCreateModal();
        }, 500);
      }
    });
  }
}
