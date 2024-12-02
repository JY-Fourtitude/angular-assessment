// change-password.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Check if user is logged in
    if (!this.authService.currentUserValue) {
      this.router.navigate(['/login']);
    }

    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmNewPassword = group.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { passwordMismatch: true };
  }

  get f() { 
    return this.changePasswordForm.controls; 
  }

  async onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.changePasswordForm.invalid) {
      return;
    }

    try {
      await this.authService.changePassword(
        this.changePasswordForm.value.currentPassword,
        this.changePasswordForm.value.newPassword
      );
      
      // Success
      alert('Password changed successfully!');
      this.changePasswordForm.reset();
      this.submitted = false;
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An unexpected error occurred';
      }
    }
  }
}