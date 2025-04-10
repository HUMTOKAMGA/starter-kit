import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible" class="modal-overlay">
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .modal-content {
        background: white;
        padding: 20px;
        border-radius: 4px;
        min-width: 300px;
      }
    `,
  ],
})
export class ModalComponent {
  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
}
