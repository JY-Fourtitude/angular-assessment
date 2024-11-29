// src/app/features/profile/profile.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto p-6">
      <div class="mb-4">
        <nav class="text-sm breadcrumbs">
          <span class="text-gray-500">Profile</span>
        </nav>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-6">My Profile</h2>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="text-gray-600">Username:</div>
            <div>{{ user?.username }}</div>
            
            <div class="text-gray-600">Email:</div>
            <div>{{ user?.email }}</div>
          </div>
          
          <div class="mt-6">
            <a 
              routerLink="/change-password" 
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Change Password
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {
  protected user: User | null = null;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }
}