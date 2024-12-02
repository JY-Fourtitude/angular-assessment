// import { Component , OnInit } from '@angular/core';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { HttpClient } from '@angular/common/http';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { WarningPopupComponent } from '../../../app/core/components/warning-component/warning.component';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   template: `
//     <div class="google-container">
//       <iframe
//         [src]="googleUrl"
//         width="100%"
//         height="100%"
//         frameborder="0"
//         style="border: 0;"
//       ></iframe>
//     </div>
//   `,
//   styles: [`
//     .google-container {
//       width: 100%;
//       height: calc(100vh - 60px);
//       overflow: hidden;
//     }
//   `]
// })
// export class HomeComponent implements OnInit {
//   googleUrl: SafeResourceUrl;

//   constructor(
//     private sanitizer: DomSanitizer,
//     private http: HttpClient,
//     private modalService: NgbModal
//   ) {
//     this.googleUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/google');
//   }

//   ngOnInit() {
//     // Show warning popup when component loads
//     this.showWarningPopup();
//   }

//   private showWarningPopup() {
//     this.modalService.open(WarningPopupComponent, {
//       centered: true,
//       backdrop: 'static'
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WarningPopupComponent } from '../../../app/core/components/warning-component/warning.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <ng-container *ngIf="!isLoggedIn; else dashboardTemplate">
      <div class="google-container">
        <iframe
          [src]="googleUrl"
          width="100%"
          height="100%"
          frameborder="0"
          style="border: 0;"
        ></iframe>
      </div>
    </ng-container>

    <ng-template #dashboardTemplate>
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
    </ng-template>
  `,
  styles: [`
    .google-container {
      width: 100%;
      height: calc(100vh - 60px);
      overflow: hidden;
    }

    .dashboard-container {
      min-height: calc(100vh - 60px);
    }

    .sidebar {
      width: 200px;
      height: calc(100vh - 60px);
      position: fixed;
      left: 0;
    }

    .main-content {
      margin-left: 200px;
      width: calc(100% - 200px);
      min-height: calc(100vh - 60px);
    }

    .sidebar-item a {
      transition: background-color 0.3s ease;
    }

    .sidebar-item a.active {
      background-color: #FFD700;
      color: #000 !important;
      border-radius: 4px;
      font-weight: 500;
    }

    .bg-primary {
      background-color: #5b9bd5 !important;
    }
  `]
})
export class HomeComponent implements OnInit {
  googleUrl: SafeResourceUrl;
  isLoggedIn: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.googleUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/google');
    this.authService.currentUser.subscribe(
      user => this.isLoggedIn = !!user
    );
  }

  ngOnInit() {
    if (!this.isLoggedIn) {
      this.showWarningPopup();
    }
  }

  private showWarningPopup() {
    this.modalService.open(WarningPopupComponent, {
      centered: true,
      backdrop: 'static'
    });
  }
}