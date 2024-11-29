import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="bg-primary p-3 d-flex justify-content-end align-items-center">
      <!-- Time display -->
      <div class="text-white text-end">
        <div>Time: {{currentTime}}</div>
        <button class="btn btn-light mt-2" routerLink="/login">Login</button>
      </div>
    </div>

    <!-- Warning Alert (if needed) -->
    <!-- <div *ngIf="showWarning" class="alert alert-warning alert-dismissible fade show" role="alert">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>WARNING</strong>
          <span class="ms-2">Time: {{currentTime}}</span>
        </div>
        <button type="button" class="btn-close" (click)="closeWarning()"></button>
      </div>
    </div> -->
  `,
  styles: [`
    .bg-primary {
      background-color: #5b9bd5 !important;
    }
    
    .btn-light {
      min-width: 80px;
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentTime: string = '';
  showWarning: boolean = true;

  ngOnInit() {
    this.updateTime();
    // Update time every minute
    setInterval(() => this.updateTime(), 60000);
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  // closeWarning() {
  //   this.showWarning = false;
  // }
}