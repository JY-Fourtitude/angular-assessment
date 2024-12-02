// warning-popup.component.ts
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warning-popup',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">WARNING</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body">
      <p>Warning message here</p>
    </div>
  `,
  styles: []
})
export class WarningPopupComponent {
  constructor(public activeModal: NgbActiveModal) {}
}