import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="bg-primary p-3 d-flex justify-content-between align-items-center">
      <!-- User Welcome -->
      <div class="text-white" *ngIf="currentUser">
        Hello {{currentUser.username}}
      </div>
      <div class="text-white" *ngIf="!currentUser">
        <!-- Empty div to maintain layout when no user -->
        &nbsp;
      </div>

      <!-- Time and Login/Logout -->
      <div class="text-white text-end">
        <div>Time: {{currentTime}}</div>
        <ng-container *ngIf="!currentUser">
          <button class="btn btn-light mt-2" routerLink="/login">Login</button>
        </ng-container>
        <ng-container *ngIf="currentUser">
          <button class="btn btn-light mt-2" (click)="logout()">Logout</button>
        </ng-container>
      </div>
    </div>
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
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(
      user => this.currentUser = user
    );
  }

  ngOnInit() {
    this.updateTime();
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}