import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="visible" (click)="onOverlayClick()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>{{ title }}</h2>
          <button class="close-button" (click)="onClose()">&times;</button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
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
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
      }

      .modal-content {
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        border-radius: 12px;
        padding: 20px;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        h2 {
          margin: 0;
          color: #fff;
          font-size: 1.5rem;
          font-weight: 600;
        }
      }

      .close-button {
        background: none;
        border: none;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.3s;

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }

      .modal-body {
        color: #fff;
      }
    `,
  ],
})
export class ModalComponent {
  @Input() visible = false;
  @Input() title = "";
  @Output() visibleChange = new EventEmitter<boolean>();

  onClose() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onOverlayClick() {
    this.onClose();
  }
}
