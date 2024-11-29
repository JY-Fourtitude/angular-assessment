// src/app/features/auth/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text" 
              [(ngModel)]="username" 
              name="username" 
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password" 
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
          </div>
          
          @if (errorMessage) {
            <div class="text-red-500 text-sm">{{ errorMessage }}</div>
          }
          
          <button 
            type="submit" 
            [disabled]="!loginForm.form.valid"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Sign In
          </button>
          
          <div class="text-center mt-4">
            <a routerLink="/forgot-password" class="text-blue-500 hover:text-blue-600">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  async onSubmit() {
    try {
      await this.authService.login(this.username, this.password);
    } catch (error) {
      this.errorMessage = 'Invalid username or password';
    }
  }
}