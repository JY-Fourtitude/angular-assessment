import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <div class="container-fluid">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mt-3">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Profile</li>
          <li class="breadcrumb-item active" aria-current="page">My Profile</li>
        </ol>
      </nav>

      <!-- Profile Content -->
      <div class="card">
        <div class="card-body">
          <div *ngIf="isLoading" class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div *ngIf="error" class="alert alert-danger">
            {{ error }}
          </div>

          <div *ngIf="profile" class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row" class="bg-light" style="width: 200px;">User Name</th>
                  <td>{{ profile?.username || 'N/A' }}</td>
                </tr>
                <tr>
                  <th scope="row" class="bg-light">Email</th>
                  <td>{{ profile?.email || 'N/A' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 20px;
    }

    .breadcrumb {
      background-color: #f8f9fa;
      padding: 0.75rem 1rem;
      border-radius: 0.25rem;
    }

    .card {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    th {
      font-weight: 500;
    }

    .table > :not(caption) > * > * {
      padding: 1rem;
    }
  `]
})
export class ProfileComponent implements OnInit {
  profile: User | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    const userId = this.authService.getCurrentUserId();
    
    if (!userId) {
      this.error = 'No user is currently logged in';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.profileService.getCurrentUserProfile(userId).subscribe({
      next: (data) => {
        this.profile = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading profile data';
        this.isLoading = false;
        console.error('Error fetching profile:', error);
      }
    });
  }
}