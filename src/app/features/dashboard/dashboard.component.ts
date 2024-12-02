import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="d-flex">
        <!-- Sidebar -->
        <div class="sidebar bg-primary text-white p-3">
          <div class="sidebar-item mb-2">
            <a routerLink="/profile" 
               class="text-white text-decoration-none d-block p-2" 
               routerLinkActive="active">
              Profile
            </a>
          </div>
          <div class="sidebar-item mb-2">
            <a routerLink="/change-password" 
               class="text-white text-decoration-none d-block p-2" 
               routerLinkActive="active">
              Change Password
            </a>
          </div>
          <div class="sidebar-item mb-2">
            <a routerLink="/products" 
               class="text-white text-decoration-none d-block p-2" 
               routerLinkActive="active">
              Products
            </a>
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content p-3">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .sidebar {
      width: 200px;
      min-height: calc(100vh - 70px);
    }

    .main-content {
      flex: 1;
    }

    .sidebar-item a {
      transition: background-color 0.3s ease;
    }

    .sidebar-item a.active {
      background-color: #FFD700; /* Yellow color */
      color: #000 !important; /* Black text for better contrast */
      border-radius: 4px;
      font-weight: 500;
    }

    .bg-primary {
      background-color: #5b9bd5 !important;
    }
  `]
})
export class Dashboard {}