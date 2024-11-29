// src/app/features/auth/change-password/change-password.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container mx-auto p-6">
      <div class="mb-4">
        <nav class="text-sm breadcrumbs">
          <a routerLink="/profile" class="text-blue-500 hover:text-blue-600">Profile</a>
          <span class="mx-2">/</span>
          <span class="text-gray-500">Change Password</span>
        </nav>
      </div>

      <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-6">Change Password</h2>
        
        <form [formGroup]="passwordForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Current Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input 
              type="password" 
              formControlName="currentPassword"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
            @if (showError('currentPassword')) {
              <p class="mt-1 text-sm text-red-500">
                Current password is required
              </p>
            }
          </div>
          
          <!-- New Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input 
              type="password" 
              formControlName="newPassword"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
            @if (showError('newPassword')) {
              <p class="mt-1 text-sm text-red-500">
                New password must be at least 8 characters
              </p>
            }
          </div>
          
          <!-- Confirm New Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input 
              type="password" 
              formControlName="confirmPassword"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
            @if (showError('confirmPassword')) {
              <p class="mt-1 text-sm text-red-500">
                Passwords don't match
              </p>
            }
          </div>
          
          <!-- Error Message -->
          @if (errorMessage) {
            <div class="bg-red-50 border-l-4 border-red-500 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-red-700">{{ errorMessage }}</p>
                </div>
              </div>
            </div>
          }

          <!-- Success Message -->
          @if (successMessage) {
            <div class="bg-green-50 border-l-4 border-green-500 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-green-700">{{ successMessage }}</p>
                </div>
              </div>
            </div>
          }
          
          <!-- Submit Button -->
          <div class="flex justify-between items-center pt-4">
            <button 
              type="button"
              routerLink="/profile"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              [disabled]="!passwordForm.valid || isSubmitting"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              @if (isSubmitting) {
                <span>Updating...</span>
              } @else {
                <span>Update Password</span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f9fafb;
    }
  `]
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    const newPassword = g.get('newPassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { 'mismatch': true };
  }

  showError(fieldName: string): boolean {
    const field = this.passwordForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  async onSubmit() {
    if (this.passwordForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        await this.authService.changePassword(
          this.passwordForm.value.currentPassword,
          this.passwordForm.value.newPassword
        );
        
        this.successMessage = 'Password updated successfully!';
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
      } catch (error) {
        this.errorMessage = error instanceof Error 
          ? error.message 
          : 'Failed to update password. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}